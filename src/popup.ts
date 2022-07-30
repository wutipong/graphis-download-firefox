import './style.scss'

import * as browser from 'webextension-polyfill'
import * as path from 'path-browserify'

let historyValues = []
const maxHistoryItemCount = 25

const nameElement = document.getElementById('name') as HTMLInputElement
const categorySelect = document.getElementById('category') as HTMLSelectElement
const directoryText = document.getElementById('directory') as HTMLInputElement

browser.storage.local.get(['name', 'history', 'category', 'directory']).then(function (data) {
    if (data.name != null) {
        nameElement.value = data.name
    }

    historyValues = data.history

    if (historyValues == null) {
        historyValues = []
    }

    if (historyValues.length > 0 && (historyValues[0] instanceof String || typeof (historyValues[0]) === 'string')) {
        for (let i = 0; i < historyValues.length; i++) {
            const key = historyValues[i]
            historyValues[i] = {
                key: key,
                timestamp: Date.now()
            }
        }
    }

    if (data.category != null) {
        categorySelect.selectedIndex = data.category
    }

    if (data.directory != null) {
        directoryText.value = data.directory
    }
    updateHistory()
})

function updateHistory() {
    const historyListElement = document.getElementById('history-list')
    historyListElement.innerHTML = ''

    historyValues.sort((a, b) => a.timestamp < b.timestamp? 0:1)

    if (historyValues.length > maxHistoryItemCount) {
        historyValues.length = maxHistoryItemCount
    }

    historyValues.forEach(function (history) {
        const option = document.createElement('OPTION')
        option.innerHTML = history.key

        historyListElement.appendChild(option)
    })
}

nameElement.addEventListener('change', function (event) {
    let name = nameElement.value.replace('\\', ' ')

    name = name.replace('/', ' ')
    name = name.trim()

    nameElement.value = name
    browser.storage.local.set({
        name: name
    })
})

directoryText.addEventListener('change', function (event) {
    let directory = directoryText.value

    directory = directory.trim()

    directoryText.value = directory
    browser.storage.local.set({
        directory: directory
    })
})

categorySelect.addEventListener('change', function (event) {
    const category = categorySelect.selectedIndex

    browser.storage.local.set({
        category: category
    })
})

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', function () {
    nameElement.value = ''

    const event = document.createEvent('HTMLEvents')
    event.initEvent('change', true, false)
    nameElement.dispatchEvent(event)
})

const historyListSelect = document.getElementById('history-list') as HTMLSelectElement

historyListSelect.addEventListener('change', function () {
    if (historyListSelect.selectedIndex < 0) return

    const selectItem = historyListSelect.options[historyListSelect.selectedIndex]
    const selectText = selectItem.text.split('\\')

    if (selectText.length === 2) {
        nameElement.value = selectText[1]
        for (let i = 0; i < categorySelect.options.length; i++) {
            if (categorySelect.options[i].text === selectText[0]) {
                categorySelect.selectedIndex = i
            }
        }
    } else {
        nameElement.value = selectText[0]
    }

    const event = document.createEvent('HTMLEvents')
    event.initEvent('change', true, false)
    nameElement.dispatchEvent(event)
    categorySelect.dispatchEvent(event)
})

const downloadButton = document.getElementById('download')
downloadButton.addEventListener('click', function () {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'download'
        }).then(function (response) {
            const name = nameElement.value
            const category = categorySelect[categorySelect.selectedIndex].textContent
            const historyEntry = category + '\\' + name

            const currentItemIndex = historyValues.findIndex((history) => history.key === historyEntry)

            if (currentItemIndex === -1) {
                historyValues.unshift({
                    key: historyEntry,
                    timestamp: Date.now()
                })
            } else {
                historyValues[currentItemIndex].timestamp = Date.now()
            }

            updateHistory()

            browser.storage.local.set({
                history: historyValues
            })

            const downloadPath = path.join((directoryText.value.length === 0 ? '' : directoryText.value), category, name)
            const downloadList = []

            response.urls.forEach(function (download) {
                downloadList.push({
                    url: download.url,
                    filename: path.join(downloadPath, download.name)
                })
            })

            if (response.profile !== undefined || response.comments !== undefined) {
                addInfo(downloadList, response, downloadPath)
            }

            downloadList.forEach(function (download) {
                browser.downloads.download({
                    url: download.url,
                    filename: download.filename
                })
            })
        })
    })
})

function addInfo(downloadList, response, downloadPath) {
    const info = {
        version: 1,
        profile: response.profile,
        comments: response.comments
    }
    const infoJson = JSON.stringify(info)
    const bytes = new TextEncoder().encode(infoJson)
    const blob = new Blob([bytes], {type: 'application/json;charset=utf-8'})
    const url = URL.createObjectURL(blob)

    downloadList.push({
        url: url,
        filename: path.join(downloadPath, 'info.json')
    })
}

const pasteButton = document.getElementById('paste')
pasteButton.addEventListener('click', async function () {
    const text = await navigator.clipboard.readText()
    nameElement.value = text

    const event = document.createEvent('HTMLEvents')
    event.initEvent('change', true, false)
    nameElement.dispatchEvent(event)
})

const populateButton = document.getElementById('populate')
populateButton.addEventListener('click', function () {
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'populate'
        }).then(function (response) {
            nameElement.value = response.name

            const event = document.createEvent('HTMLEvents')
            event.initEvent('change', true, false)
            nameElement.dispatchEvent(event)
        })
    })
})

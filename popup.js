var historyValues = []
var nameElement = document.getElementById('name')
var categorySelect = document.getElementById('category')
var directoryText = document.getElementById('directory')

browser.storage.local.get(['name', 'history', 'category', 'directory'], function (data) {
  if (data.name != null) {
    nameElement.value = data.name
  }

  historyValues = data.history

  if (historyValues == null) {
    historyValues = []
  }

  if (historyValues.length > 0 && (historyValues[0] instanceof String || typeof (historyValues[0]) === 'string')) {
    for (let i = 0; i < historyValues.length; i++) {
      let key = historyValues[i]
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

const maxItemCount = 20

function updateHistory () {
  let historyListElement = document.getElementById('history-list')
  historyListElement.innerHTML = ''

  historyValues.sort(function (a, b) {
    return a.timestamp > b.timestamp
  })

  if (historyValues.length > maxItemCount) {
    historyValues.length = maxItemCount
  }

  historyValues.forEach(function (history) {
    let option = document.createElement('OPTION')
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
  let category = categorySelect.selectedIndex

  browser.storage.local.set({
    category: category
  })
})

let clearButton = document.getElementById('clear')
clearButton.addEventListener('click', function () {
  nameElement.value = ''

  var event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  nameElement.dispatchEvent(event)
})

let historyListSelect = document.getElementById('history-list')
let historySelect = document.getElementById('history-select')
historySelect.addEventListener('click', function () {
  let selectItem = historyListSelect.options[historyListSelect.selectedIndex]
  let selectText = selectItem.text.split('\\')

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

  var event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  nameElement.dispatchEvent(event)
  categorySelect.dispatchEvent(event)
})

let downloadButton = document.getElementById('download')
downloadButton.addEventListener('click', function () {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      greeting: 'hello'
    }, function (response) {
      let name = nameElement.value
      let category = categorySelect[categorySelect.selectedIndex].text
      let historyEntry = category + '\\' + name

      let currentItemIndex = historyValues.findIndex((history) => history.key === historyEntry)

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

      const downloadPath = (directoryText.value.length === 0 ? '' : (directoryText.value + '\\'))
      let downloadList = []

      response.urls.forEach(function (download) {
        downloadList.push({
          url: download.url,
          filename: downloadPath + category + '\\' + name + '\\' + download.name
        })
      })

      if (response.profile !== undefined || response.comments !== undefined) {
        addInfo(downloadList, response, downloadPath, category, name)
      }

      downloadList.forEach(function (download) {
        browser.downloads.download({
          url: download.url,
          filename: download.filename
        })
      })

      window.close()
    })
  })
})

function addInfo (downloadList, response, downloadPath, category, name) {
  const info = {
    version: 1,
    profile: response.profile,
    comments: response.comments
  }
  const infoJson = JSON.stringify(info)
  const bytes = new TextEncoder().encode(infoJson)
  const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' })
  var url = URL.createObjectURL(blob)

  downloadList.push({
    url: url,
    filename: downloadPath + category + '\\' + name + '\\' + 'info.json'
  })
}

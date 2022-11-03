<script lang="ts">

    import * as browser from "webextension-polyfill";
    import * as path from "path-browserify";

    let historyValues = []
    const maxHistoryItemCount = 25

    let name = ""
    let categoryIndex = 0
    let categoryText = ""
    let directory = ""
    let historyIndex = 0

    const categoryOptions = [
        "Graphis Gal",
        "First Gravure",
        "Limited Edition",
        "Special",
        "Feti Style",
    ]

    browser.storage.local.get(['name', 'history', 'category', 'directory']).then(function (data) {
        if (data.name != null) {
            name = data.name
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
            categoryIndex = data.category
        }

        if (data.directory != null) {
            directory = data.directory
        }
        updateHistory()
    })

    function updateHistory() {
        const historyListElement = document.getElementById('history-list')
        historyListElement.innerHTML = ''

        historyValues.sort((a, b) => a.timestamp < b.timestamp ? 0 : 1)

        if (historyValues.length > maxHistoryItemCount) {
            historyValues.length = maxHistoryItemCount
        }

        historyValues.forEach(function (history) {
            const option = document.createElement('OPTION')
            option.innerHTML = history.key

            historyListElement.appendChild(option)
        })
    }

    function onNameChange() {
        name = name.replace('\\', ' ')
        name = name.replace('/', ' ')
        name = name.trim()

        browser.storage.local.set({
            name: name
        })
    }

    function onDirectoryChange() {
        directory = directory.trim()

        browser.storage.local.set({
            directory: directory
        })
    }

    function onCategoryChange() {
        browser.storage.local.set({
            category: categoryIndex
        })
    }

    function clearName() {
        name = ''
    }

    function historyChange() {
        const selectItem = historyValues[historyIndex]
        const selectText = selectItem.text.split('\\')

        if (selectText.length === 2) {
            name = selectText[1]
            categoryIndex = categoryOptions.indexOf(selectText[2])
        } else {
            name = selectText[0]
        }
    }

    function download() {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }).then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: 'download'
            }).then(function (response) {
                const historyEntry = categoryText + '\\' + name

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

                const downloadPath = path.join((directory.length === 0 ? '' : directory), categoryText, name)
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
    }

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

    async function pasteName() {
        name = await navigator.clipboard.readText()
    }

    function populateName() {
        browser.tabs.query({
            active: true,
            currentWindow: true
        }).then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: 'populate'
            }).then(function (response) {
                name = response.name
            })
        })
    }
</script>


<section class="section">
    <h1 class="title">Graphis Download Helper</h1>

    <div class="field">
        <label class="label">Name</label>
        <div class="field has-addons">
            <div class="control">
                <div class="select">
                    <select class="input" id="category" on:change={onCategoryChange}>
                        {#each categoryOptions as option}
                            <option>{option}</option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Model Name [Collection]" bind:value="{name}"
                       on:change="{onNameChange}">
            </div>
            <div class="control">
                <button id="populate" class="button" type="button" title="Populate model name" on:click={populateName}>
                    <span class="icon is-small">
                        <i class="fas fa-female"></i>
                    </span>
                </button>
            </div>
            <div class="control">
                <button id="paste" class="button" type="button" title="Paste from clipboard." on:click={pasteName}>
                    <span class="icon is-small">
                        <i class="fas fa-clipboard"></i>
                    </span>
                </button>
            </div>
            <div class="control">
                <button class="button is-danger" type="button" title="Clear the field value." on:click={clearName}>
                    <span class="icon is-small">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <div class="field">
        <label class="label">History</label>
        <div class="control">
            <div class="field">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select class="input" id="history-list" on:change={historyChange}> </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label">Download To</label>
        <div class="field">
            <div class="control">
                <input class="input" type="text" id="directory" value={directory} on:change={onDirectoryChange}
                       placeholder="path inside browser's download.">
            </div>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button id="download" type="button" class="button is-primary" on:click={download}>
                    <span class="icon is-small">
                        <i class="fas fa-download"></i>
                    </span>
                <span>Download</span>
            </button>
        </div>
    </div>

</section>

<script lang="ts">

    import * as browser from "webextension-polyfill";
    import * as path from "path-browserify";
    import HistoryList from "./HistoryList.svelte";
    import {onMount} from "svelte";

    let name = ""
    let category = "Graphis Gal"
    let directory = ""

    let historyList: HistoryList

    const categoryOptions = [
        "Graphis Gal",
        "First Gravure",
        "Limited Edition",
        "Special",
        "Feti Style",
    ]

    onMount(async()=>{
        const data = await browser.storage.local.get(['directory']);
        if (data.directory != null) {
            directory = data.directory
        }
    })

    function onNameChange() {
        name = name.replace('\\', ' ')
        name = name.replace('/', ' ')
        name = name.trim()
    }

    function onDirectoryChange() {
        directory = directory.trim()

        browser.storage.local.set({
            directory: directory
        })
    }

    function clearName() {
        name = ''
    }

    function addDownloads(response, downloadList: any[], downloadPath: string) {
        response.urls.forEach((download) => {
            downloadList.push({
                url: download.url,
                filename: path.join(downloadPath, download.name)
            })
        })
    }

    async function download() {
        const currentTabs = await browser.tabs.query({
            active: true,
            currentWindow: true
        })
        const response = await browser.tabs.sendMessage(currentTabs[0].id, {
            command: 'query'
        })

        historyList.add(category, name)

        const downloadPath = path.join((directory.length === 0 ? '' : directory), category, name)
        const downloadList = []

        addDownloads(response, downloadList, downloadPath);

        if (response.profile !== undefined || response.comments !== undefined) {
            addInfo(downloadList, response, downloadPath)
        }

        if(response.children !== undefined) {
            const tabs = await Promise.all(
                response.children.map(async child => await browser.tabs.create({
                    active: false,
                    url: child,
                })
            ))

            const results = await Promise.all(tabs.map(async tab =>
                queryFromItemTab(tab)
            ))

            results.forEach(c => addDownloads(c, downloadList, downloadPath) )
            for (const t of tabs) {
                await browser.tabs.remove(t.id);
            }
        }
        downloadList.forEach((download)=> {
            browser.downloads.download({
                url: download.url,
                filename: download.filename
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

    async function populateName() {
        const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true
        })
        const response = await browser.tabs.sendMessage(tabs[0].id, {
            command: 'populateName'
        })

        name = response.name
        onNameChange()
    }

    function onHistorySelect(c: string, n: string) {
        category = c
        name = n
    }

    async function queryFromItemTab(tab: browser.Tabs.Tab) {
        while (true) {
            try {
                const result = await browser.tabs.sendMessage(tab.id, {command: "query"})
                if (result != undefined) {
                    return result
                }
            } catch (err) {

            }
        }
    }

</script>


<section class="section">
    <h1 class="title">Graphis Download Helper</h1>

    <div class="field">
        <label class="label" for="name-control">Name</label>
        <div class="field has-addons" id="name-control">
            <div class="control">
                <div class="select">
                    <select class="input" id="category" bind:value={category}>
                        {#each categoryOptions as option}
                            <option value="{option}">{option}</option>
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
        <label class="label" for="history-control">History</label>
        <div class="control" id="history-control">
            <div class="field">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <HistoryList bind:this={historyList} onSelect="{onHistorySelect}"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label" for="path-control">Download To</label>
        <div class="field" id="path-control">
            <div class="control">
                <input class="input" type="text" id="directory" bind:value="{directory}" on:change={onDirectoryChange}
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

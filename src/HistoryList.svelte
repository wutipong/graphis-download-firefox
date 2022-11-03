<script lang="ts">
    import { onMount } from 'svelte';
    import * as browser from "webextension-polyfill";

    const maxItemCount = 25

    export let onSelect: (category: string, name: string)=>{}

    let items:HistoryItem[] = []
    let selected = ""

    interface HistoryItem {
        timestamp: Date
        category: string
        name: string
    }

    onMount(async ()=>{
        const data = await browser.storage.local.get(['history_items'])
        items = JSON.parse(data.history)
        await updateHistory()
    })

    async function onChange(){
        let item = items[selected]
        onSelect(item.category, item.name)
        item.date = new Date()
        items[selected] = item

        await updateHistory()
    }

    async function updateHistory() {
        items = items.sort((a, b) => a.timestamp < b.timestamp ? 0 : 1)
        if(items.length > maxItemCount) {
            items.length = maxItemCount
        }

        const json = JSON.stringify(items)
        await browser.storage.local.set({'history_items': json})
    }

    export async function add(category: string, name: string){
        items.unshift({
            timestamp: new Date(),
            category: category,
            name: name,
        })

        await updateHistory()
        selected = "0"
    }
</script>

<div class="select is-fullwidth">
    <select class="input" id="history-list" on:change={onChange} bind:value={selected}>
        {#each items as item, index (item)}
            <option value="{index}">{item.category}/{item.name}</option>
        {/each}
    </select>

</div>
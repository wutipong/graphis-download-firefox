<script lang="ts">
    import { onMount } from 'svelte';
    import * as browser from "webextension-polyfill";

    const maxItemCount = 25

    export let onSelect: (category: string, name: string)=>{}

    let items:HistoryItem[] = []
    let selected = undefined
    $: {
        if(selected !== undefined && onSelect) {
            const value = items[selected]
            onSelect(value.category, value.name)

            add(value.category, value.name)
        }
    }

    interface HistoryItem {
        timestamp: Date
        category: string
        name: string
    }

    onMount(async ()=>{
        const data = await browser.storage.local.get(['history_items'])
        if (!(data.history_items !== null && data.history_items !== "")) {
            return;
        }

        items = JSON.parse(data.history_items)
        await updateHistory()
    })


    async function updateHistory() {
        items = items.sort((a, b) => a.timestamp > b.timestamp ? 0 : 1)
        if(items.length > maxItemCount) {
            items.length = maxItemCount
        }

        const json = JSON.stringify(items)
        await browser.storage.local.set({'history_items': json})
    }

    export async function add(category: string, name: string){
        const index = items.findIndex(v =>v.category == category && v.name == name)
        if(index == -1) {
            items.unshift({
                timestamp: new Date(),
                category: category,
                name: name,
            })
        }

        await updateHistory()
    }
</script>

<div class="select is-fullwidth">
    <select class="input" id="history-list" bind:value={selected}>
        {#each items as item, index}
            <option value={index}>{item.category}/{item.name}</option>
        {/each}
    </select>
</div>

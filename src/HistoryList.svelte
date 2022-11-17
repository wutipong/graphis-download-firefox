<script lang="ts">
    import {onMount} from 'svelte';
    import * as browser from "webextension-polyfill";

    const maxItemCount = 25

    export let onSelect: (category: string, name: string) => {}

    interface HistoryItem {
        timestamp: Date
        category: string
        name: string
    }

    let items: HistoryItem[] = []
    let select: HTMLSelectElement

    onMount(async () => {
        const data = await browser.storage.local.get(['history_items'])
        if (!(data.history_items !== null && data.history_items !== "")) {
            return;
        }

        items = JSON.parse(data.history_items)

        if (items.length > 0 && onSelect != undefined) {
            onSelect(items[0].category, items[0].name)
        }
    })

    export async function add(category: string, name: string) {
        const index = items.findIndex(v => v.category == category && v.name == name)
        if (index !== -1) {
            select.selectedIndex = index
            return
        }

        items.unshift({
            timestamp: new Date(),
            category: category,
            name: name,
        })

        if (items.length > maxItemCount) {
            items.length = maxItemCount
        }

        items = items

        const json = JSON.stringify(items)
        await browser.storage.local.set({'history_items': json})
    }

    function selectionChanged() {
        const index = select.selectedIndex
        const selected = items[index]

        onSelect ? onSelect(selected.category, selected.name) : null
    }
</script>

<div class="select is-fullwidth">
    <select class="input" on:change={selectionChanged} bind:this={select}>
        {#each items as item}
            <option>{item.category}/{item.name}</option>
        {/each}
    </select>
</div>

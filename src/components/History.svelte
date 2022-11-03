<script lang="ts">
    import * as browser from "webextension-polyfill";

    export let name = "";
    export let category = "";

    const maxHistoryItemCount = 20;

    class HistoryItem {
        name: string;
        category: string;
        timestamp: Date;
    }

    let historyItems: HistoryItem[];

    async function populateHistory() {
        let data = await browser.storage.local.get('history');
        if (data.history == null) return;

        historyItems = JSON.parse(data.history.toString());
    }

    populateHistory();

    async function saveHistory() {
        await browser.storage.local.set({
            history: JSON.stringify(historyItems)
        })
    }

    export async function addHistory(category: string, name: string){
        let item = {
            name: name,
            category: category,
            timestamp: Date.now(),
        }

        historyItems.sort((a, b) => a.timestamp < b.timestamp? 0:1)

        if (historyItems.length > maxHistoryItemCount) {
            historyItems.length = maxHistoryItemCount
        }

        await saveHistory();
    }
</script>

<div class="field">
    <label class="label">History</label>
    <div class="control">
        <div class="field">
            <div class="control is-expanded">
                <div class="select is-fullwidth">
                    <select class="input" id="history-list">
                        {#each historyItems as hist}
                            <option>{hist.category} / {hist.name}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>

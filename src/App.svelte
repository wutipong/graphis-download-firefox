<script lang="ts">
import Details from './components/Details.svelte'
import History from './components/History.svelte'

let name = "";
let category = "";

</script>

<main>
    <section class="section">
        <h1 class="title">Graphis Download Helper</h1>
        <Details name={name} category={category}/>

        <History />

        <div class="field">
            <label class="label">Download To</label>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" id="directory" placeholder="path inside browser's download.">
                </div>

            </div>
        </div>
        <div class="field">
            <div class="control">
                <button id="download" type="button" class="button is-primary">
                    <span class="icon is-small">
                        <i class="fas fa-download"></i>
                    </span>
                    <span>Download</span>
                </button>
            </div>
        </div>

    </section>
</main>

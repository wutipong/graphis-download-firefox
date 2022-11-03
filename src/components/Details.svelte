<script lang="ts">
    export let name: string = "";
    export let category: string = "";

    function clear()  {
        name = "";
        category = "Graphis Gal"
    }

    async function paste(){
        const text = await navigator.clipboard.readText()
        name = text
    }
</script>

<div class="field">
    <label class="label">Name</label>
    <div class="field has-addons">
        <div class="control">
            <div class="select">
                <select class="input" id="category" bind:value={category}>
                    <option selected>Graphis Gal</option>
                    <option>First Gravure</option>
                    <option>Limited Edition</option>
                    <option>Special</option>
                    <option>Feti Style</option>
                </select>
            </div>
        </div>
        <div class="control is-expanded">
            <input class="input" type="text" id="name" bind:value={name} placeholder="Model Name [Collection]">
        </div>
        <div class="control">
            <button id="populate" class="button" type="button" title="Populate model name">
                <span class="icon is-small">
                    <i class="fas fa-female"></i>
                </span>
            </button>
        </div>
        <div class="control">
            <button id="paste" class="button" type="button" on:click={paste()} title="Paste from clipboard.">
                <span class="icon is-small">
                    <i class="fas fa-clipboard"></i>
                </span>
            </button>
        </div>
        <div class="control">
            <button id="clear" class="button is-danger" type="button" on:click={clear()} title="Clear the field value.">
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
            </button>
        </div>
    </div>
</div>

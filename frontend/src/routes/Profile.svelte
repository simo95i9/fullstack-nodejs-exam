<script>
    import { authentication } from '../stores.js'

</script>

<fieldset>
    <legend><h1>Profile Page</h1></legend>

    <div>
    {#each (Object.entries($authentication)) as entry}
        <label for='{entry[0]}'>{entry[0]}</label>
        <span id='{entry[0]}'>{entry[1]}</span>
    {/each}
    </div>

</fieldset>


<style>

    fieldset {
        margin: auto;
        padding: 1em;
        max-width: 700px;

        border: var(--border-width) solid grey;
        border-radius: var(--border-radius);
    }

    fieldset > div {
        display: grid;
        grid-template-columns: fit-content(32ch) auto;
        grid-column-gap: 0.5em;
    }

    label {
        text-align: end;
    }

</style>
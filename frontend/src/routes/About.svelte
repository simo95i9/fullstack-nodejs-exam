<script>

</script>

<fieldset>
    <legend><h1>Colors</h1></legend>
    <div class='container'>
        <div class='palette'>
            <div class='color' style='background-color: var(--clr-rich-black);'></div>
            <div class='color' style='background-color: var(--clr-midnight-green);'></div>
            <div class='color' style='background-color: var(--clr-dark-cyan);'></div>
            <div class='color' style='background-color: var(--clr-tiffany-blue);'></div>
            <div class='color' style='background-color: var(--clr-vanilla);'></div>
            <div class='color' style='background-color: var(--clr-gamboge);'></div>
            <div class='color' style='background-color: var(--clr-alloy-orange);'></div>
            <div class='color' style='background-color: var(--clr-rust);'></div>
            <div class='color' style='background-color: var(--clr-rufous);'></div>
            <div class='color' style='background-color: var(--clr-auburn);'></div>
        </div>
    </div>
</fieldset>


<style>
    fieldset {
        max-width: 700px;
        margin-inline: auto;
        padding: 1em;

        border: var(--border-width) solid grey;
        border-radius: var(--border-radius);
    }

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 0.25em;
    }

    .palette {
        display: flex;
        flex-direction: row;
    }

    .color {
        width: 48px;
        flex-grow: 1;
        height: 128px;
    }

</style>
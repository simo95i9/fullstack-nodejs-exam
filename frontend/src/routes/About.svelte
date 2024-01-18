<script>

    import Card from 'frontend/src/lib/Card.svelte'
</script>

<main>
    <h1>Colors</h1>
    <Card border={false} pad={false}>
        <div class='palette'>
            <div class='color' style='background-color: var(--clr-off-white-1);'></div>
            <div class="color" style="background-color: var(--clr-gamboge-1);"></div>
            <div class="color" style="background-color: var(--clr-alloy-orange-1);"></div>
            <div class="color" style="background-color: var(--clr-rust-1);"></div>
            <div class="color" style="background-color: var(--clr-rufous-1);"></div>
            <div class="color" style="background-color: var(--clr-auburn-1);"></div>
            <div class="color" style="background-color: var(--clr-tiffany-blue-1);"></div>
            <div class="color" style="background-color: var(--clr-dark-cyan-1);"></div>
            <div class="color" style="background-color: var(--clr-midnight-green-1);"></div>
            <div class="color" style="background-color: var(--clr-rich-black-1);"></div>
        </div>
        <div class="palette">
            <div class='color' style='background-color: var(--clr-off-white-2);'></div>
            <div class="color" style="background-color: var(--clr-gamboge-2);"></div>
            <div class="color" style="background-color: var(--clr-alloy-orange-2);"></div>
            <div class="color" style="background-color: var(--clr-rust-2);"></div>
            <div class="color" style="background-color: var(--clr-rufous-2);"></div>
            <div class="color" style="background-color: var(--clr-auburn-2);"></div>
            <div class="color" style="background-color: var(--clr-tiffany-blue-2);"></div>
            <div class="color" style="background-color: var(--clr-dark-cyan-2);"></div>
            <div class="color" style="background-color: var(--clr-midnight-green-2);"></div>
            <div class="color" style="background-color: var(--clr-rich-black-2);"></div>
        </div>
        <div class="palette">
            <div class='color' style='background-color: var(--clr-off-white-3);'></div>
            <div class="color" style="background-color: var(--clr-gamboge-3);"></div>
            <div class="color" style="background-color: var(--clr-alloy-orange-3);"></div>
            <div class="color" style="background-color: var(--clr-rust-3);"></div>
            <div class="color" style="background-color: var(--clr-rufous-3);"></div>
            <div class="color" style="background-color: var(--clr-auburn-3);"></div>
            <div class="color" style="background-color: var(--clr-tiffany-blue-3);"></div>
            <div class="color" style="background-color: var(--clr-dark-cyan-3);"></div>
            <div class="color" style="background-color: var(--clr-midnight-green-3);"></div>
            <div class="color" style="background-color: var(--clr-rich-black-3);"></div>

        </div>
    </Card>
</main>


<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .palette {
        display: flex;
        flex-direction: row;
    }

    .color {
        width: 48px;
        flex-grow: 1;
        height: 48px;
    }

</style>

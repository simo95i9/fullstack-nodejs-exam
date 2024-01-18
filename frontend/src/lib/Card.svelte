<script>
    export let pad = true
    export let border = true
    export let background = false
    export let shadow = true
    export let fit = false
    export let inline = false
</script>

<div class="card" class:background class:border class:pad class:shadow class:fit class:inline>
    <slot />
</div>


<style>
    .card {
        border-radius: var(--border-radius);
        overflow: clip;
    }

    .pad {
        padding: 2rem;
    }

    .pad.fit {
        padding-inline: .5rem;
        padding-block: .1rem;
    }

    .inline {
        display: inline-block;
    }

    .border {
        border: var(--border-width) solid var(--border-color);
    }

    .background {
        color: var(--clr-off-white-2);
        background-color: var(--clr-midnight-green-2);

        & * {
            color: var(--clr-off-white-2);
        }
    }

    .shadow {
        box-shadow: var(--shadow-elevation-medium);
    }
</style>

<script>
    import Card from 'frontend/src/lib/Card.svelte'
    import { delete_tag } from 'frontend/src/api/tags.js'

    /** @type {Tag|null} */
    export let tag
    export let update
    export let background = false
    export let deletable = false

    async function submit() {
        await delete_tag({ id: tag.id })
        await update()
    }
</script>

<Card {background} fit={true} inline={true}>
    <div>
        <span>{ tag.name }</span>

        {#if deletable}
            <button type="submit" title="delete tag" on:click={submit}>×</button>
        {/if}
    </div>
</Card>

<style>
    div {
        cursor: default;
        -webkit-user-select: none;
        user-select: none;
    }
    button {
        cursor: pointer;
        margin-inline-start: .25rem;
        padding: 0;
        border: none;
        background: none;
    }
</style>

<script>
    import Card from './Card.svelte'
    import { onMount } from 'svelte'
    import { get_by_id } from 'frontend/src/api/accounts.js'
    import { get_tags_by_event_id } from 'frontend/src/api/events.js'
    import { Link } from 'svelte-routing'

    /** @type {import('backend/models/events').Event} */
    export let event

    onMount(async () => {
        event.account = await get_by_id({ id: event.account_id })
        event.tags = await get_tags_by_event_id({ event_id: event.id })
    })
</script>


<Card>
    <div class="flex">
        <Link to="/events/id/{event.id}"><h2>{event.name}</h2></Link>

        <div class="pills">
            <Card background={true} fit={true} inline={true}>
                Begins: { event.zoned_datetime_begin.toPlainDateTime().toLocaleString() }</Card>
            <Card background={true} fit={true} inline={true}>
                Ends: { event.zoned_datetime_end.toPlainDateTime().toLocaleString() }</Card>
            {#if event.account}
                <Card fit={true} background={true} inline={true}>Hosted by: { event.account.full_name }</Card>
            {/if}

            {#if event.datetime_modified}
                <Card inline={true} background={true} fit={true}>
                    Updated: { event.datetime_modified.toLocaleString() }</Card>
            {:else}
                <Card inline={true} background={true} fit={true}>
                    Created: { event.datetime_created.toLocaleString() }</Card>
            {/if}
        </div>

        {#if event.tags}
            <div class="pills">
                {#each event.tags as tag}
                    <Card inline={true} background={true} fit={true}>{tag.name}</Card>
                {/each}
            </div>
        {/if}
    </div>
</Card>


<style>
    .flex {
        display: flex;
        flex-flow: column;
        gap: 1rem;

        & a {
            color: var(--clr-rich-black-2);
            text-decoration: none;

            & :hover {
                text-decoration-line: underline;
                text-decoration-thickness: 1.5pt;
                text-underline-offset: 2pt;
            }
        }
    }

    .pills {
        font-size: 0.8rem;
        display: flex;
        flex-flow: row wrap;
        gap: .5rem;
    }
</style>

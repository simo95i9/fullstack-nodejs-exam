<script>

    import { onMount } from 'svelte'
    import { account } from 'frontend/src/api/auth.js'
    import { get_by_account_id } from 'frontend/src/api/events.js'
    import Event from 'frontend/src/lib/Event.svelte'

    let events

    onMount(async () => {
        events = await get_by_account_id({ account_id: $account.id })
    })

</script>


<div class="flex">
    <h1>Your Events</h1>

    {#each events ?? [] as event}
        <Event {event} />
    {:else}
        It seems you haven't created events, yet...
    {/each}
</div>


<style>
    .flex {
        display: flex;
        flex-flow: column;
        row-gap: 2rem;
    }

</style>

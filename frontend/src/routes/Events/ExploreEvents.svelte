<script>
    import { onMount } from 'svelte'
    import { get_all } from 'frontend/src/api/events.js'
    import Event from 'frontend/src/lib/Event.svelte'

    let events = []

    onMount(async () => {
        events = await get_all()
    })
</script>

<h1>Explore Events</h1>
<br>

{#each events as event}
    <Event {event} />
    <br>
{/each}


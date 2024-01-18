<script>
    import Card from 'frontend/src/lib/Card.svelte'
    import Form from 'frontend/src/lib/Form.svelte'
    import { onMount } from 'svelte'
    import { create_new } from 'frontend/src/api/events.js'
    import { get_by_type } from 'frontend/src/api/tags.js'
    import { navigate } from 'svelte-routing'

    let form = {
        title: 'Demonstration mod dåsepant',
        begin: '2024-01-25 13.00.00',
        end: '2024-01-25 16.00.00',
        tag_ids: []
    }

    let location_tags = []
    let category_tags = []

    onMount(async () => {
        location_tags = await get_by_type('location')
        category_tags = await get_by_type('category')
    })

    async function submit() {
        const event = await create_new(form)
        if (event) navigate(`/events/id/${event.id}`)
    }

    function reset() {
        form = {
            title: 'Demonstration mod dåsepant',
            begin: '2024-01-25 13.00.00',
            end: '2024-01-25 16.00.00',
            tag_ids: []
        }
    }
</script>


<h1>Create a New Event</h1>

<Card>
    <Form {reset} {submit}>
        <fieldset>
            <label for="title">Title</label>
            <input bind:value={form.title} id="title" type="text">
        </fieldset>
        <fieldset>
            <label for="title">Begin</label>
            <input bind:value={form.begin} id="begin" type="datetime-local">
        </fieldset>
        <fieldset>
            <label for="title">End</label>
            <input bind:value={form.end} id="end" type="datetime-local">
        </fieldset>

        <h2>Location</h2>
        <div class="flex">
            {#each location_tags ?? [] as location_tag}
                <Card inline={true} fit={true} background={true}>
                    <input type="checkbox" id="location-{location_tag.id}" value={location_tag.id}
                           bind:group={form.tag_ids} />
                    <label for="location-{location_tag.id}">{location_tag.name}</label>
                </Card>
            {/each}
        </div>


        <h2>Category</h2>
        <div class="flex">
            {#each category_tags ?? [] as category_tag}
                <Card inline={true} fit={true} background={true}>
                    <input type="checkbox" id="category-{category_tag.id}" value={category_tag.id}
                           bind:group={form.tag_ids} />
                    <label for="category-{category_tag.id}">{category_tag.name}</label>
                </Card>
            {/each}
        </div>

        <fieldset>
            <input type="submit" value="Create Event">
            <input type="reset" value="Reset">
        </fieldset>
    </Form>
</Card>


<style>
    .flex {
        display: flex;
        flex-flow: row wrap;
        gap: .5rem;
    }

</style>

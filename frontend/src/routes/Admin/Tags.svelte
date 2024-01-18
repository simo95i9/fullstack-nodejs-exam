<script>
    import Card from '../../lib/Card.svelte'
    import { create_new, get_by_type } from '../../api/tags.js'
    import { onMount } from 'svelte'
    import Form from 'frontend/src/lib/Form.svelte'
    import Tag from 'frontend/src/lib/Tag.svelte'

    let location_tags = []
    let category_tags = []

    onMount(async () => {
        location_tags = await get_by_type('location')
        category_tags = await get_by_type('category')
    })

    let form = {
        type: '',
        name: ''
    }

    async function update() {
        location_tags = await get_by_type('location')
        category_tags = await get_by_type('category')
    }

    async function submit() {
        await create_new(form)
        location_tags = await get_by_type('location')
        category_tags = await get_by_type('category')
        reset()
    }

    function reset() {
        form = {
            type: '',
            name: ''
        }
    }
</script>

<h1>Tags</h1>
<br>

<Card>
    <h2>Create a new tag</h2>
    <Form {reset} {submit}>
        <fieldset>
            <label for="type">Type</label>
            <select bind:value={form.type} id="type">
                <option value="location">Location</option>
                <option value="category">Category</option>
            </select>
        </fieldset>

        <fieldset>
            <label for="name">Name</label>
            <input bind:value={form.name} id="name" type="text">
        </fieldset>

        <fieldset>
            <input id="submit" type="submit" value="Submit">
            <input id="reset" type="reset" value="Reset">
        </fieldset>
    </Form>
</Card>
<br>

<Card>
    <h2>Locations ({ location_tags.length })</h2>
    <hr>
    <div class="tags">
        {#each location_tags as location_tag}
            <Tag tag={location_tag} {update} deletable={true}/>
        {/each}
    </div>
</Card>
<br>

<Card>
    <h2>Categories ({ category_tags.length })</h2>
    <hr>
    <div class="tags">
        {#each category_tags as category_tag}
            <Tag tag={category_tag} {update} deletable={true} />
        {/each}
    </div>
</Card>
<br>


<style>
    hr {
        margin-block: .25rem .75rem;
    }
    .tags {
        display: flex;
        flex-flow: row wrap;
        gap: .2rem;
    }
</style>

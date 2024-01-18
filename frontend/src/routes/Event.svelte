<script>
    import { onMount } from 'svelte'
    import { get_by_id as get_event_by_id, get_tags_by_event_id } from 'frontend/src/api/events.js'
    import { get_by_id as get_account_by_id } from 'frontend/src/api/accounts.js'
    import { create_new as create_new_post, get_by_event_id as get_posts_by_event_id } from 'frontend/src/api/posts.js'
    import Card from 'frontend/src/lib/Card.svelte'
    import { account } from 'frontend/src/api/auth.js'
    import Form from 'frontend/src/lib/Form.svelte'

    /** @type {String} */
    export let id
    let event
    let content = ''

    async function submit() {
        const post = await create_new_post({ content, event_id: event.id })
        if (post) {
            event.posts = get_posts_by_event_id({ event_id: event.id })
        }
    }

    function reset() {
        content = ''
    }

    onMount(async () => {
        /** @type {import('backend/models/events').Event} */
        event = await get_event_by_id({ id })
        if (event) {
            event.account = await get_account_by_id({ id: event.account_id })
            event.posts = await get_posts_by_event_id({ event_id: id })
            event.tags = await get_tags_by_event_id({ event_id: id })
        }
        console.dir(event)
    })

</script>

<main>
    {#if event}
        <h1>{event.name}</h1>

        <div>
            <h2>Quick Info</h2>
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
        </div>


        {#if event.tags}
            <div>
                <h2>Tags</h2>
                <div class="pills">
                    {#each event.tags ?? [] as tag}
                        <Card background={true} fit={true} inline={true}>
                            {tag.name}
                        </Card>
                    {/each}
                </div>
            </div>
        {/if}


        {#if $account && event.account_id === $account.id}
            <Card>
                <Form {submit} {reset}>
                    <label for="content">
                        Create a new post to share information about the event with your attendees
                        (tip: you can use <a href="https://commonmark.org/">markdown</a>)
                    </label>
                    <textarea id="content" bind:value={content}></textarea>

                    <fieldset>
                        <input type="submit" value="Post">
                        <input type="reset" value="Reset">
                    </fieldset>
                </Form>
            </Card>
        {/if}

        <div>
            <h2>Updates</h2>
            <div class="flex">
                {#each event.posts ?? [] as post}
                    <Card><div class="body_text">{@html post.content}</div></Card>
                {:else}
                    Doesn't seem like the organizers have made any posts, yet...
                {/each}
            </div>
        </div>
    {/if}
</main>


<style>
    main {
        display: flex;
        flex-flow: column;

        row-gap: 2rem;
    }

    .body_text {
        font-weight: 450;
    }

    .flex {
        display: flex;
        flex-flow: column;

        row-gap: 1rem;
    }

    textarea {
        resize: block;
    }

    .pills {
        display: flex;
        flex-flow: row wrap;
        gap: .5rem
    }

</style>

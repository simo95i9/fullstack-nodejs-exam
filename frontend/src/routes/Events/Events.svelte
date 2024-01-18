<script>
    import { Link, Route, Router } from 'svelte-routing'

    import CreateEvent from 'frontend/src/routes/Events/CreateEvent.svelte'
    import Card from 'frontend/src//lib/Card.svelte'
    import { onMount } from 'svelte'
    import { get_by_type } from 'frontend/src/api/tags.js'
    import ExploreEvents from 'frontend/src/routes/Events/ExploreEvents.svelte'

    let formdata = {
        sorting: 'popular',
        location: [],
        tags: []
    }

    const orderings = [
        { key: 'popular', display: 'Popular' },
        { key: 'soon', display: 'Happening Soon' },
        { key: 'recent', display: 'Recently Created' }
    ]

    let location_tags = []
    let category_tags = []


    onMount(async () => {
        location_tags = await get_by_type('location')
        category_tags = await get_by_type('category')
    })
</script>


<Router>
    <aside>
        <Card background={true}>
            <nav>
                <Link to="">Explore Events</Link>
                <Link to="new">Create an Event</Link>
            </nav>
        </Card>
    </aside>
    <main>
        <Route component={ ExploreEvents } path="" />
        <Route component={ ExploreEvents } path="explore" />
        <Route component={ CreateEvent } path="new" />
    </main>
</Router>


<style>
    nav {
        display: flex;
        flex: 1 1 0;

        flex-flow: column nowrap;
        column-gap: 2em;

        font-size: 12pt;
        color: var(--clr-off-white-2);
        background-color: var(--clr-midnight-green-2);

        & > a {
            color: inherit;
            text-decoration: none;
        }

        & > a:hover, a[aria-current=page] {
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-color: var(--clr-off-white-2);
            text-decoration-thickness: 1pt;
            text-underline-offset: 2pt;
        }
    }
</style>

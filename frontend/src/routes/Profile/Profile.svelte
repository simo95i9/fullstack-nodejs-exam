<script>
    import Details from 'frontend/src/routes/Profile/Details.svelte'
    import { Link, Route, Router } from 'svelte-routing'
    import Auth from 'frontend/src/routes/Profile/Auth.svelte'
    import Events from 'frontend/src/routes/Profile/Events.svelte'
    import Card from 'frontend/src/lib/Card.svelte'
</script>


<Router>
    <aside>
        <Card background={true}>
            <nav>
                <Link to="details">Details</Link>
                <Link to="auth">Authentication</Link>
                <Link to="events">Events</Link>
            </nav>
        </Card>
    </aside>
    <main>
        <Route component={Details} path="" />
        <Route component={Details} path="details" />
        <Route component={Auth} path="auth" />
        <Route component={Events} path="events" />
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

<script>
    import Tags from 'frontend/src/routes/Admin/Tags.svelte'
    import Accounts from 'frontend/src/routes/Admin/Accounts.svelte'
    import Events from 'frontend/src/routes/Admin/Events.svelte'

    import { Link, Route, Router } from 'svelte-routing'
    import Card from 'frontend/src/lib/Card.svelte'
</script>


<Router>
    <aside>
        <Card background={true}>
            <nav>
                <Link to="tags">Tags</Link>
                <Link to="accounts">Accounts</Link>
                <Link to="events">Events</Link>
            </nav>
        </Card>
    </aside>
    <main>
        <Route component={Tags} path="" />
        <Route component={Tags} path="tags" />
        <Route component={Accounts} path="accounts" />
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

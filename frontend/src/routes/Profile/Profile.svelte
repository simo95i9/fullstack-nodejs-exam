<script>
    import { Link, Route, Router } from 'svelte-routing'
    import Details from './Details.svelte'
    import VerticalNav from '../../lib/VerticalNav.svelte'
    import Events from './Events.svelte'
    import Auth from './Auth.svelte'
</script>

<Router basepath='profile'>
    <div class='container'>
        <VerticalNav>
            <Link to='details'>Profile Details</Link>
            <Link to='auth'>Authentication</Link>
            <Link to='events'>Your Events</Link>
        </VerticalNav>

        <div class='content'>
            <Route path='/' } component={ Details } />
            <Route path='details' } component={ Details } />
            <Route path='auth' } component={ Auth } />
            <Route path='events' } component={ Events } />
        </div>
    </div>
</Router>

<style>
    .container {
        height: 100%;
        display: flex;
        flex: 1 1 auto;
        flex-flow: row nowrap;
        column-gap: var(--menu-column-gap);
    }

    .content {
        flex: 1 1 auto;

    }
</style>
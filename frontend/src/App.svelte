<script>
    import { Router, Link, Route } from 'svelte-routing'
    import { onMount } from 'svelte'
    import { status } from './api/auth.js'

    import Home from './routes/Home.svelte'
    import About from './routes/About.svelte'
    import Events from './routes/Events.svelte'
    import Profile from './routes//Profile/Profile.svelte'
    import SignIn from './routes/SignIn.svelte'
    import SignUp from './routes/SignUp.svelte'
    import SignOut from './routes/SignOut.svelte'

    import ProtectedRoute from './lib/ProtectedRoute.svelte'
    import ProtectedComponent from './lib/ProtectedComponent.svelte'
    import HorizontalNav from './lib/HorizontalNav.svelte'
    import Spacer from './lib/Spacer.svelte'

    let url = document.location.pathname
    onMount(async () => status())
</script>

<Router basepath='/' {url}>
    <HorizontalNav>
        <Link to='/'>Home</Link>
        <Link to='events'>Events</Link>
        <Link to='about'>About</Link>

        <Spacer />

        <ProtectedComponent>
            <svelte:fragment slot="signed_out">
                <Link to='signin'>Sign In</Link>
                <Link to='signup'>Sign Up</Link>
            </svelte:fragment>
            <svelte:fragment slot="signed_in">
                <Link to='profile'>Profile</Link>
                <Link to='signout'>Sign Out</Link>
            </svelte:fragment>
        </ProtectedComponent>
    </HorizontalNav>
    <main>
        <Route path='/' component={ Home } />
        <Route path='about' component={ About } />
        <Route path='events' component={ Events } />
        <Route path='signin' component={ SignIn } />
        <Route path='signup' component={ SignUp } />
        <ProtectedRoute path='profile/*' component={ Profile } />
        <ProtectedRoute path='signout' component={ SignOut } />
    </main>
    <footer>Eventuality, an interactive event board for nice people</footer>
</Router>

<style>

    main {
        display: flex;
        flex-flow: column nowrap;
        padding: 1em;
        flex-grow: 1;
    }

    footer {
        font-size: 10pt;
        background-color: var(--theme-header-footer);
        color: var(--clr-off-white-2);
        text-align: end;
        padding: 0.5em 2em;
    }

</style>

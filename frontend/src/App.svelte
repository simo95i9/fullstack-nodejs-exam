<script>
    import { Router, Link, Route } from 'svelte-routing'
    import { onMount } from 'svelte'
    import { accounts } from './api.js'

    import Home from './routes/Home.svelte'
    import About from './routes/About.svelte'
    import Events from './routes/Events.svelte'
    import Profile from './routes/Profile.svelte'
    import SignIn from './routes/SignIn.svelte'
    import SignUp from './routes/SignUp.svelte'
    import SignOut from './routes/SignOut.svelte'

    import NavigationMenu from './lib/NavigationMenu.svelte'
    import ProtectedRoute from './lib/ProtectedRoute.svelte'

    let url = document.location.pathname
    onMount(async () => {
        await accounts.status({ })
    })
</script>

<Router {url}>
    <NavigationMenu />

    <main>
        <Route path='/' component={ Home } />
        <Route path='/about' component={ About } />
        <Route path='/events' component={ Events } />
        <Route path='/signin' component={ SignIn } />
        <Route path='/signup' component={ SignUp } />
        <ProtectedRoute path='/profile' component={ Profile } />
        <ProtectedRoute path='/signout' component={ SignOut } />
    </main>
</Router>

<style>

    main {
        min-height: 100vh;
        padding: 1em;
    }

</style>

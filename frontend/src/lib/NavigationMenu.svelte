<script>
    import { Link } from 'svelte-routing'
    import Spacer from '../lib/Spacer.svelte'
    import ProtectedComponent from '../lib/ProtectedComponent.svelte'
</script>

<nav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/events'>Events</Link>

    <Spacer />

    <ProtectedComponent>
        <svelte:fragment slot='signed_out'>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
        </svelte:fragment>
        <svelte:fragment slot='signed_in'>
            <Link to='/profile'>Profile</Link>
            <Link to='/signout'>Sign Out</Link>
        </svelte:fragment>
    </ProtectedComponent>
</nav>


<style>
    nav {
        display: flex;
        flex-wrap: wrap;
        column-gap: 2em;
        padding: 0.5em 1em;
        font-weight: 900;
        background-color: var(--clr-midnight-green);
    }

    nav :global(a) {
        color: white;
        text-decoration: none;
    }

    nav :global([aria-current=page]) {
        text-decoration-line: underline;
        text-decoration-color: white;
        text-decoration-style: solid;
        text-decoration-thickness: 2px;
        text-underline-offset: 2px;
    }
</style>
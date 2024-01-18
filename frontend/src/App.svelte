<script>
    import { Link, Route, Router } from 'svelte-routing'
    import { onMount } from 'svelte'
    import { status } from 'frontend/src/api/auth.js'

    import Home from 'frontend/src/routes/Home.svelte'
    import About from 'frontend/src/routes/About.svelte'
    import Events from 'frontend/src/routes/Events/Events.svelte'
    import Event from 'frontend/src/routes/Event.svelte'
    import Profile from 'frontend/src/routes/Profile/Profile.svelte'
    import SignIn from 'frontend/src/routes/SignIn.svelte'
    import SignUp from 'frontend/src/routes/SignUp.svelte'
    import SignOut from 'frontend/src/routes/SignOut.svelte'

    import ProtectedComponent from 'frontend/src/lib/ProtectedComponent.svelte'
    import ProtectedRoute from 'frontend/src/lib/ProtectedRoute.svelte'
    import PrivilegedComponent from 'frontend/src/lib/PrivilegedComponent.svelte'
    import PrivilegedRoute from 'frontend/src/lib/PrivilegedRoute.svelte'
    import Admin from 'frontend/src/routes/Admin/Admin.svelte'

    let url = document.location.pathname
    onMount(async () => status())
</script>

<Router {url}>
    <div class="grid">
        <header class="full-bleed">
            <nav>
                <Link to='/'>Home</Link>
                <Link to='events'>Events</Link>
                <Link to='about'>About</Link>

                <span class="flex-grow"></span>

                <PrivilegedComponent>
                    <svelte:fragment slot="privileged">
                        <Link to='admin'>Admin</Link>
                    </svelte:fragment>
                </PrivilegedComponent>

                <ProtectedComponent>
                    <svelte:fragment slot="authenticated">
                        <Link to='profile'>Profile</Link>
                        <Link to='signout'>Sign Out</Link>
                    </svelte:fragment>
                    <svelte:fragment slot="unauthenticated">
                        <Link to='signin'>Sign In</Link>
                        <Link to='signup'>Sign Up</Link>
                    </svelte:fragment>
                </ProtectedComponent>
            </nav>
        </header>

        <Route component={ Home } path="/" />
        <Route component={ Events } path="/events/*" />
        <Route component={ Event } path="/events/id/:id" />
        <Route component={ About } path="/about" />

        <Route component={ SignUp } path="/signup" />
        <Route component={ SignIn } path="/signin" />

        <PrivilegedRoute component={ Admin } path="/admin/*" />

        <ProtectedRoute component={ Profile } path="/profile/*" />
        <ProtectedRoute component={ SignOut } path="/signout" />

        <footer class="full-bleed">
            Eventuality, an interactive event board for nice people
        </footer>
    </div>
</Router>

<style>
    .flex-grow {
        flex-grow: 1;
    }

    header > nav {
        display: flex;
        flex: 1 1 0;

        flex-flow: row nowrap;
        column-gap: 2em;

        padding-inline: 2rem;
        padding-block: .5rem;

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

    footer {
        padding-inline: 2rem;
        padding-block: .5rem;

        grid-row-start: 4;

        font-size: 8pt;
        color: var(--clr-off-white-2);
        background-color: var(--clr-midnight-green-2);
    }

    .grid {
        display: grid;

        background-color: var(--clr-off-white-2);
        grid-template-columns: 1fr minmax(auto, 30ch) minmax(auto, 84ch) 1fr;
        grid-auto-rows: 6rem minmax(min-content, max-content) 1fr 2rem;

        grid-auto-flow: row;

        grid-column-gap: 2rem;
        grid-row-gap: 1rem;
        min-height: 100vh;

        & > aside:has(~ main) {
            text-align: end;
            grid-column: 2 / 3;
        }

        & > aside ~ main {
            grid-column: 3 / 4;
            grid-row: 2 / span 2;
        }

        & > main {
            grid-column: 1 / 5;

            display: grid;
            grid-template-columns: subgrid;
            grid-auto-rows: minmax(min-content, max-content);

            & > .full-bleed {
                grid-column: 1 / -1;
            }

            & > * {
                grid-column: 2 / -2;
            }
        }


        & .full-bleed {
            grid-column: 1 / -1;
        }

        & > * {
            grid-column: 2 / 4;
        }
    }
</style>

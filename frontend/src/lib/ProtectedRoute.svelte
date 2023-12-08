<script>
    import { Route } from 'svelte-routing';
    import ProtectedComponent from './ProtectedComponent.svelte'
    import SignIn from '../routes/SignIn.svelte'

    export let path;
    export let component;
</script>

<ProtectedComponent>
    <svelte:fragment slot='signed_in'>
        <Route path={path} component={ component } />
    </svelte:fragment>
    <svelte:fragment slot='signed_out'>
        <Route path={path} component={ SignIn } />
    </svelte:fragment>
</ProtectedComponent>
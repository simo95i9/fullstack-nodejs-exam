<script>
    import { Route } from 'svelte-routing';
    import ProtectedComponent from 'frontend/src/lib/ProtectedComponent.svelte'
    import SignIn from 'frontend/src/routes/SignIn.svelte'

    export let path;
    export let component;
</script>

<ProtectedComponent>
    <svelte:fragment slot='authenticated'>
        <Route path={path} component={ component } />
    </svelte:fragment>
    <svelte:fragment slot='unauthenticated'>
        <Route path={path} component={ SignIn } />
    </svelte:fragment>
</ProtectedComponent>

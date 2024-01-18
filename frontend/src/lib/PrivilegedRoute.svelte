<script>
    import { Route } from 'svelte-routing';
    import PrivilegedComponent from 'frontend/src/lib/PrivilegedComponent.svelte'
    import Error from 'frontend/src/lib/Error.svelte'

    export let path;
    export let component;
</script>

<PrivilegedComponent>
    <svelte:fragment slot='privileged'>
        <Route path={path} component={ component } />
    </svelte:fragment>
    <svelte:fragment slot='unprivileged'>
        <Route path={path}><Error message="You cannot access this page, it is only for administrators."/></Route>
    </svelte:fragment>
</PrivilegedComponent>

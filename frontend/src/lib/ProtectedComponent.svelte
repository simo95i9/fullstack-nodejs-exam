<script>
    import { authentication } from '../stores.js';
    $: isAuthenticated = !!$authentication
</script>

{#if isAuthenticated}
    <slot name='signed_in'></slot>
{:else}
    <slot name='signed_out'></slot>
{/if}
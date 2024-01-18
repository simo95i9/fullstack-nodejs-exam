<script>
    import { account } from 'frontend/src/api/auth.js'
</script>

{#if $account}
    <slot name='authenticated'></slot>
{:else}
    <slot name='unauthenticated'></slot>
{/if}

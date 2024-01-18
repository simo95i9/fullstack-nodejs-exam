<script>
    import { account } from 'frontend/src/api/auth.js'
</script>

{#if $account && $account.admin}
    <slot name='privileged'></slot>
{:else}
    <slot name='unprivileged'></slot>
{/if}

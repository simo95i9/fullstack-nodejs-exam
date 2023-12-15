<script>
    import { account } from '../api/auth.js'
</script>

{#if $account}
    <slot name='signed_in'></slot>
{:else}
    <slot name='signed_out'></slot>
{/if}
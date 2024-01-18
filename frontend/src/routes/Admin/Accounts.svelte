<script>
    import AccountCard from 'frontend/src/lib/AccountCard.svelte'
    import { onMount } from 'svelte'
    import { get_all } from 'frontend/src/api/accounts.js'

    let accounts

    onMount(async () => {
        accounts = await get_all()
    })
</script>

<div class="flex">
    <h1>Accounts</h1>
    {#each accounts ?? [] as account}
        <AccountCard {account}></AccountCard>
    {/each}
</div>

<style>
    .flex {
        display: flex;
        flex-flow: column;
        row-gap: 1rem;
    }
</style>

<script>
    import { account, status } from 'frontend/src/api/auth.js'
    import { onMount } from 'svelte'
    import { navigate } from 'svelte-routing'
    import AccountCard from 'frontend/src/lib/AccountCard.svelte'

    onMount(async () => {
        await status()
        if (!$account) {
            await navigate('/signin')
        }
    })
</script>

<h1>Account Details</h1>

<AccountCard account={$account} />

<script>
    import { account, status } from '../../api/auth.js'
    import { onMount } from 'svelte'
    import { navigate } from 'svelte-routing'

    onMount(async () => {
        await status()
        if (!$account) {
            await navigate('/signin')
        }
    })
</script>

<fieldset>
    <legend><h2>Account Details</h2></legend>
    <dl>
        <dt>Full Name</dt><dd>{ $account?.full_name }</dd>
        <dt>Display Name</dt><dd>{ $account?.display_name }</dd>
        <dt>Email</dt><dd>{ $account?.email }</dd>

        <span>&nbsp;</span><span>&nbsp;</span>

        <dt>Created</dt><dd>{ $account?.datetime_created }</dd>
        <dt>Modified</dt><dd>{ $account?.datetime_modified ?? 'Never' }</dd>
        <dt>Deleted</dt><dd>{ $account?.datetime_deleted ?? 'Never' }</dd>
    </dl>
</fieldset>

<style>
    fieldset {
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1em 2em;
    }

    dl {
        display: grid;
        grid-template-columns: fit-content(32ch) auto;
        column-gap: 1em;
    }

    dt {
        text-align: end;
    }

    dt:after {
        content: ':';
    }
</style>
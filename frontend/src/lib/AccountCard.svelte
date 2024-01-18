<script>
    import Card from 'frontend/src/lib/Card.svelte'

    export let account
</script>

<Card>
    <div class="hstack">
        <dl>
            <dt>Full Name</dt>
            <dd>{ account?.full_name }</dd>
            <dt>Display Name</dt>
            <dd>{ account?.display_name }</dd>
            <dt>Email</dt>
            <dd>{ account?.email }</dd>
            <span>&nbsp;</span><span>&nbsp;</span>
            <dt>Administrator</dt>
            <dd>{ account?.admin ? 'Yes' : 'No' }</dd>
            <span>&nbsp;</span><span>&nbsp;</span>
            <dt>Created</dt>
            <dd>{ account?.datetime_created?.toLocaleString() }</dd>
            <dt>Modified</dt>
            <dd>{ account?.datetime_modified?.toLocaleString() ?? 'Never' }</dd>
            <dt>Deleted</dt>
            <dd>{ account?.datetime_deleted?.toLocaleString() ?? 'Never' }</dd>
        </dl>

        <img alt="Avatar" class="avatar" src="{account.picture}">
    </div>
</Card>

<style>
    .hstack {
        display: flex;
        flex-flow: row nowrap;
        align-items: start;
    }

    .avatar {
        width: 12em;
        height: 12em;
    }

    dl {
        flex: 1 1 0;
        display: grid;
        grid-template-columns: 16ch auto;
        column-gap: 1em;
    }

    dt {
        text-align: end;
    }

    dt:after {
        content: ':';
    }
</style>

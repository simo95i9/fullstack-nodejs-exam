<script>
    import { account, signin } from '../api/auth.js'
    import { navigate } from 'svelte-routing'
    import { onDestroy } from 'svelte'

    let form = {
        email: '',
        password: ''
    }

    let timed_action = -1
    async function submit() {
        await signin(form)
        if ($account) {
            timed_action = setTimeout(() => { navigate('/')}, 1000)
        }
    }

    onDestroy(() => {
        clearTimeout(timed_action)
    })
</script>

<div>
    <h1>Sign In</h1>

    <form id="signin" on:submit|preventDefault={submit}>
        <label for="email">Email</label>
        <input id="email" type="email" autocomplete="email"
               placeholder='alice@example.com' bind:value={form.email}>
        <label for="password">Password</label>
        <input id="password" type='password' autocomplete='current-password'
               placeholder='••••••••••••' bind:value={form.password}>

    </form>

    <button form="signin" type="submit">Sign In</button>
</div>


<style>
    div {
        max-width: 900px;
        margin-inline: auto;
    }

    form {
        display: grid;
        grid-template-columns: fit-content(32ch) auto;
        grid-column-gap: 0.5em;
    }

    input[type=text], input[type=email], input[type=password] {
        border: unset;
        border-bottom: var(--border-width) solid lightgrey;
        outline: none;
    }

    input[type=text]:focus, input[type=email]:focus, input[type=password]:focus {
        border: none;
        border-bottom: var(--border-width) solid lightseagreen;
    }

    input {
        padding-inline-start: 0.5em;
        padding-inline-end: 1em;
    }

    label {
        text-align: end;
        padding-inline-start: 1em;
    }

    button {
        all: unset;
    }

</style>
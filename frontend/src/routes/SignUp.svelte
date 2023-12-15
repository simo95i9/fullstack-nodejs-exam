<script>
    import { account, signup } from '../api/auth.js'
    import { navigate } from 'svelte-routing'
    import { onDestroy } from 'svelte'

    let form = {
        full_name: '',
        display_name: '',
        email: '',
        password: ''
    }

    let timed_action
    async function submit() {
        await signup(form)
        if ($account) {
            timed_action = setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }

    onDestroy(() => {
        clearTimeout(timed_action)
    })
</script>

<div>
    <h1>Sign In</h1>

    <form id="signin" on:submit|preventDefault={submit}>
        <label for="full_name">Full Name</label>
        <input id="full_name" type="text" autocomplete="name" placeholder="Your full name"
               bind:value={form.full_name}>
        <label for="display_name">Display Name</label>
        <input id="display_name" type="text" autocomplete="nickname" placeholder="Your display name"
               bind:value={form.display_name}>

        <label for="email">Email</label>
        <input id="email" type="email" autocomplete="email"
               placeholder='alice@example.com' bind:value={form.email}>
        <label for="password">Password</label>
        <input id="password" type='password' autocomplete='current-password'
               placeholder='••••••••••••' bind:value={form.password}>

    </form>

    <button form="signin" type="submit">Sign Up</button>
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
        border: var(--border-width) solid black;
        border-radius: var(--border-radius);
        background-color: var(--clr-vanilla-2);
    }

    button:hover {
        background-color: var(--clr-vanilla-3);

    }

    button:active {
        background-color: var(--clr-vanilla-1);
    }

</style>
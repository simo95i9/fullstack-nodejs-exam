<script>
    import { accounts } from '../api.js'
    import { navigate } from 'svelte-routing'

    import { Logger } from 'shared/utils.js'
    const logger = new Logger('frontend::signin')

    let form = {
        email: '',
        password: '',
    }

    async function submit() {
        const response = await accounts.signin(form)

        if (!response.success) {
            logger.debug(response)
            return
        }

        navigate('/')
    }
</script>

<fieldset>
    <legend>
        <h1>Sign-In form</h1>
    </legend>
    <form action='#' on:submit|preventDefault={submit}>

        <label for='email'>Email</label>
        <input type='text' id='text' name='text' placeholder='alice@example.com' bind:value={form.email}>

        <label for='password'>Password</label>
        <input type='password' id='password' name='password' autocomplete='current-password' placeholder='••••••••••••' bind:value={form.password}>

        <input type='submit' value='Sign In!'>
    </form>
</fieldset>

<style>
    fieldset {
        margin: auto;
        padding: 1em;
        max-width: 700px;

        border: var(--border-width) solid grey;
        border-radius: var(--border-radius);
    }

    form {
        display: grid;
        grid-template-columns: fit-content(32ch) auto;
        grid-column-gap: 0.5em;
    }

    input[type=submit] {
        border: var(--border-width) solid lightgrey;
        border-radius: var(--border-radius);
        background-color: unset;
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
</style>
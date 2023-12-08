<script>
    import { Logger } from 'shared/utils.js'
    import { navigate } from 'svelte-routing'

    const logger = new Logger('frontend::signup')
    import { accounts } from '../api.js'

    let form = {
        full_name: '',
        display_name: '',
        email: '',
        password: ''
    }

    async function submit() {
        const response = await accounts.signup(form)

        if (!response.success) {
            logger.debug(response)
            return
        }

        navigate('/')
    }

</script>


<fieldset>
    <legend>
        <h1>Sign-Up form</h1>
    </legend>
    <form action='#' on:submit|preventDefault={ submit }>

        <label for='full_name'>Full name</label>
        <input type='text' id='full_name' name='full_name' autocomplete='name'
               placeholder='Your full name' bind:value={form.full_name}>

        <label for='display_name'>Display name</label>
        <input type='text' id='display_name' name='display_name' autocomplete='nickname'
               placeholder='How you would like to be addressed' bind:value={form.display_name}>

        <label for='email'>Email</label>
        <input type='text' id='text' name='text' placeholder='alice@example.com'
               bind:value={form.email}>

        <label for='password'>Password</label>
        <input type='password' id='password' name='password' autocomplete='new-password'
               placeholder='••••••••••••' bind:value={form.password}>

        <input type='submit' value='Sign Up!'>
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
        grid-row-gap: 0.5em;
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
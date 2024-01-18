<script>
    import { account, signin } from 'frontend/src/api/auth.js'
    import { navigate } from 'svelte-routing'
    import { onDestroy } from 'svelte'
    import Card from 'frontend/src/lib/Card.svelte'
    import Form from 'frontend/src/lib/Form.svelte'

    let form = { }
    let timed_action = -1

    async function submit() {
        await signin(form)
        if ($account) {
            timed_action = setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }

    function reset() {
        form = { }
    }

    onDestroy(() => {
        clearTimeout(timed_action)
    })
</script>

<main>
    <h1>Sign In</h1>

    <Card>
        <Form {submit} {reset}>
            <fieldset>
                <label for="email">Email</label>
                <input autocomplete="email" bind:value={form.email} id="email"
                       placeholder='alice@example.com' type="email">
            </fieldset>

            <fieldset>
                <label for="password">Password</label>
                <input autocomplete='current-password' bind:value={form.password} id="password"
                       placeholder='••••••••••••' type='password'>
            </fieldset>

            <fieldset>
                <input type="submit" value="Sign In">
                <input type="reset" value="Reset">
            </fieldset>
        </Form>
    </Card>
</main>


<style>
    form {
        display: grid;
        grid-template-columns: fit-content(35ch) auto;
        grid-column-gap: 0.5rem;
        grid-row-gap: 1rem;

        padding: 1rem;

        & input[type=text], input[type=email], input[type=password] {
            border: none;
            border-bottom: var(--border-width) solid lightgrey;
            outline: none;

            padding-block: 0;
            line-height: revert;
        }

        & input[type=text]:focus, input[type=email]:focus, input[type=password]:focus {
            border: none;
            border-bottom: var(--border-width) solid lightseagreen;
        }

        & input {
            padding-inline-start: 0.5em;
            padding-inline-end: 1em;
        }

        & label {
            text-align: end;
            padding-inline-start: 1em;
        }
    }

    button {
        all: unset;

        text-align: center;
        padding: 1rem 2rem;

        color: var(--clr-off-white-2);
        background-color: var(--clr-midnight-green-2);

        border-radius: var(--border-radius);
        box-shadow: var(--shadow-elevation-medium);
    }

    button:hover {
        color: var(--clr-off-white-1);
        background-color: var(--clr-midnight-green-1);
    }

    button:active {
        color: var(--clr-off-white-3);
        background-color: var(--clr-midnight-green-3);
        box-shadow: var(--shadow-elevation-low);
    }

</style>

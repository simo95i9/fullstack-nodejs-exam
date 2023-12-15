<script>
    import { signout } from 'frontend/src/api/auth.js'
    import { onDestroy } from 'svelte'
    import { navigate } from 'svelte-routing'


    let timer = setTimeout(() => {
        signout()
        navigate('/')
    }, 2000)

    onDestroy(() => {
        clearTimeout(timer)
    })
</script>

<h1>Sign Out</h1>

<p>You are being signed out, redirecting shortly…</p>
<script>
    import { accounts } from '../api.js'
    import { Logger } from 'shared/utils.js'
    const logger = new Logger('frontend::signout')
    import { navigate, useHistory } from 'svelte-routing'
    import { onMount } from 'svelte'

    onMount(async () => {
        const response = await accounts.signout({ })
        navigate('/')
    })
</script>
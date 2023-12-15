<script>
</script>


<nav>
    <slot/>
</nav>

<style>
    nav {
        display: flex;
        flex-flow: column nowrap;
        text-align: end;

        padding-inline: 3em 1em;
        padding-block: 1em;
        row-gap: var(--menu-row-gap);
        background-color: var(--theme-header-footer);
    }

    nav :global(a) {
        color: var(--clr-off-white-2);
        text-decoration: none;
    }

    nav :global(a[aria-current=page]) {
        text-decoration-line: underline;
        text-decoration-color: var(--clr-off-white-2);
        text-decoration-style: solid;
        text-decoration-thickness: 2px;
        text-underline-offset: 2px;
    }
</style>
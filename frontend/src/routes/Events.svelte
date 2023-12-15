

<h1>Events</h1>

<div class="flex">
    <section class="column">
        <menu>
            <li><h2>Popular</h2></li>
            <li><h2>Latest Updates</h2></li>
            <li><h2>Happening Soon</h2></li>
        </menu>
    </section>
    <section class="column">

    </section>
</div>

<style>
    .flex, .flex * {
        display: flex;
    }

    div {
        flex-flow: row nowrap;
    }

    section.column {
        flex: 1 1 0;
    }

    section > menu {
        padding: 0;
        column-gap: var(--menu-column-gap);
        list-style: none;
        flex-flow: row nowrap;
    }
</style>

<script>
    export let submit
    export let reset
</script>


<form on:reset|preventDefault={reset} on:submit|preventDefault={submit}>
    <slot></slot>
</form>


<style>
    form {
        display: flex;
        flex-flow: column;

        row-gap: .5rem;

        & > fieldset {
            margin: 0;
            padding: 0;

            display: flex;
            flex-flow: row nowrap;

            column-gap: .5rem;
            border: none;

            justify-items: baseline;

            & > label, input {
                padding-block: .5rem;;
            }

            & > label {
                flex: 0 0 var(--label-width, 10ch);
                text-align: end;
                padding-inline-start: 1rem;
            }

            & > input, select {
                flex: 1 1 auto;

                padding-inline-start: .5rem;
                padding-inline-end: 1rem;

                outline: none;
                border: .5pt solid var(--clr-rich-black-1);
                border-radius: .25rem;
            }

            & > input[type=text], input[type=email], input[type=password] {
                border-bottom: var(--underline-thickness) solid var(--clr-tiffany-blue-2);
                line-height: revert;

                &:focus {
                    border-bottom-color: var(--clr-dark-cyan-2);
                }

                &:invalid {
                    border-bottom-color: var(--clr-rufous-2-2);
                }
            }

            & > select {
                appearance: none;
                cursor: pointer;
            }

            & > input[type=submit], input[type=reset] {
                flex: 1 1 0;

                text-align: center;
                padding: .5rem 1rem;

                border: none;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-elevation-medium);
            }

            & > input[type=submit] {
                color: var(--clr-off-white-2);
                background-color: var(--clr-midnight-green-2);

                &:hover {
                    color: var(--clr-off-white-1);
                    background-color: var(--clr-midnight-green-1);
                }

                &:active {
                    color: var(--clr-off-white-3);
                    background-color: var(--clr-midnight-green-3);
                    box-shadow: var(--shadow-elevation-low);
                }
            }

            & > input[type=reset] {
                color: var(--clr-off-white-2);
                background-color: var(--clr-alloy-orange-2);

                &:hover {
                    color: var(--clr-off-white-1);
                    background-color: var(--clr-alloy-orange-1);
                }

                &:active {
                    color: var(--clr-off-white-3);
                    background-color: var(--clr-alloy-orange-3);
                    box-shadow: var(--shadow-elevation-low);
                }
            }
        }

    }
</style>

<script>
    export let text = "";
    export let clickHandler = () => {};
    export let style = "primary";
    export let size = "normal";
</script>

<button on:click={clickHandler} class="button {style} {size}">
    {#if text === ""}
        <slot></slot>
    {:else}
        {text}
    {/if}
</button>

<style>
    .button {
        background-color: var(--button-main);
        border: none;
        border-radius: 10px;
        color: var(--font-white);
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1;
        padding: 0.75rem 1.25rem;
        transition: background 0.4s ease;
        cursor: pointer;
        flex: 1;
    }

    /**SIZE*/
    .button.small {
        font-size: 0.875rem;
        padding: 0.625rem;
        font-weight: normal;
    }

    /**
        COLORS
    */
    .button:hover {
        background-color: var(--button-main-hover);
    }

    .button.danger {
        background-color: var(--danger);
    }

    .button.danger:hover {
        background-color: var(--danger-accent);
    }
</style>

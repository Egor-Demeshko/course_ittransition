<script>
    export let text = "";
    /** @type {Function}*/
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
        padding: clamp(0.6rem, 0.9vw, 0.75rem) clamp(0.85rem, 1.6vw, 1.25rem);
        transition: background 0.4s ease;
        cursor: pointer;
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    /**SIZE*/
    .button.small {
        font-size: 0.875rem;
        padding: clamp(0.375rem, 1.1vw, 0.625rem);
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

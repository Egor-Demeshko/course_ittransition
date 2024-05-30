<script>
    import { createEventDispatcher } from "svelte";
    import { COL_TITLE_CHANGED } from "$lib/data/consts";

    export let title = "";
    export let description = "";

    function update({ target }) {
        title = target.textContent;
    }

    function updateDescription({ target }) {
        description = "";
        description = target.textContent;
    }
</script>

<div>
    <h4 contenteditable="true" on:blur|stopPropagation={update}>{title}</h4>
    <div
        contenteditable="true"
        class="description"
        on:blur|stopPropagation={updateDescription}
    >
        {@html description}
    </div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        font-family: Poppins, sans-serif;
        color: var(--font-violet);
    }

    h4 {
        font-size: clamp(1.5rem, 2.1vw, 1.7rem);
        line-height: 1.18;
        font-weight: normal;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h4,
    .description {
        border: 2px solid transparent;
        transition: border 0.4s ease;
        border-radius: 4px;
        cursor: text;
    }

    h4:hover,
    .description:hover,
    h4:focus,
    .description:focus {
        border: 2px solid var(--border-active);
    }

    .description {
        font-size: 0.875rem;
        line-height: 22px;
    }
</style>

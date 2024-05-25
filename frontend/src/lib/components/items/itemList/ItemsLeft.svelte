<script>
    import { ITEM_ID } from "$data/texts";
    import ItemAdditionalField from "./ItemAdditionalField.svelte";

    /** @type {number}*/
    export let id;
    /** @type {string}*/
    export let name;

    /** @type {import('$types/types').AdditionalFieldComposed[]}*/
    export let additional_fields = [];
</script>

<div class="item_left">
    <div class="top">
        <span>{ITEM_ID}: {id}</span>
        <h4>{name}</h4>
    </div>
    <div class="bottom">
        {#each additional_fields as { label, type, content }}
            <ItemAdditionalField {label} {type} {content} />
        {/each}
    </div>
</div>

<style>
    .item_left {
        font-family: Poppins, sans-serif;
        line-height: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    span {
        font-size: 1rem;
        color: var(--grey);
    }
    .top {
        display: flex;
        gap: 1.4rem;
        align-items: end;
    }

    h4 {
        font-size: 1.375rem;
        line-height: 1rem;
        font-weight: bold;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--violet);
        border: 2px solid transparent;
        transition: border 0.4s ease;
        border-radius: 4px;
        cursor: text;
    }

    h4:hover,
    h4:focus {
        border: 2px solid var(--border-active);
    }

    .bottom {
        display: flex;
        gap: 1.125rem;
    }
</style>

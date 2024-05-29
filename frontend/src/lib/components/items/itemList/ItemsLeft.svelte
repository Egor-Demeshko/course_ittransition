<script>
    import { ITEM_ID } from "$data/texts";
    import { updateItem } from "$items/updateItem";
    import { createEventDispatcher } from "svelte";
    import ItemAdditionalField from "./ItemAdditionalField.svelte";
    import { COL_TITLE_CHANGED } from "$data/consts";

    /** @type {number}*/
    export let id;
    /** @type {string}*/
    export let name;

    let editStatus = true;

    /** @type {import('$types/types').AdditionalFieldComposed[]}*/
    export let additional_content = [];
    const dispatch = createEventDispatcher();

    async function changeItemTitle(e) {
        editStatus = false;
        const content = e.target.textContent ?? "";

        if (content) {
            /**
             * @type {{ modified_at: string }}
             */
            const result = await updateItem(id, { name: content });

            if (result && result.modified_at) {
                dispatch(COL_TITLE_CHANGED, {
                    modified_at_updated: result.modified_at,
                    name_updated: content,
                });
            }
        }

        editStatus = true;
    }
</script>

<div class="item_left">
    <div class="top">
        <span>{ITEM_ID}: {id}</span>
        <h4
            contenteditable={editStatus}
            on:blur|preventDefault={changeItemTitle}
        >
            {name}
        </h4>
    </div>
    <div class="bottom">
        {#each additional_content as { label, type, content }}
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
        flex: 1;
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
        line-height: 1.15;
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

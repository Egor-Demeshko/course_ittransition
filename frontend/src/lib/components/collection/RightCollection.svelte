<script>
    import AddButton from "$lib/components/Controlls/AddButton.svelte";
    import SaveDelete from "$lib/components/collection/SaveDelete.svelte";
    import Dropdown from "$lib/components/Controlls/DropDown.svelte";
    import { CATEGORIES } from "$lib/data/texts.js";
    import { COL_FIELD_ADDED } from "$lib/data/consts.js";
    import {
        LAST_MODIFIED,
        WAS_NOT_MODIFIED,
        ADD_FIELD,
    } from "$lib/data/texts.js";
    import Button from "../Controlls/Button.svelte";
    import { createEventDispatcher } from "svelte";

    /** @type {?string}*/
    export let image_link;
    /** @type {?string}*/
    export let modified_at;
    /** @type {string}*/
    export let category;

    const dispatch = createEventDispatcher();
</script>

<div class="right">
    <div class="top">
        <AddButton {image_link} on:image_changed />
        <div class="buttons_rows">
            <div class="top_row">
                <div class="top_row__date">
                    <p>
                        {`${LAST_MODIFIED}:`}
                        <span
                            >{modified_at
                                ? modified_at
                                : WAS_NOT_MODIFIED}</span
                        >
                    </p>
                </div>
                <SaveDelete on:save_collection />
            </div>
            <div class="bottom_row">
                <div class="bottom__buttons">
                    <Dropdown
                        on:dropdown_changed
                        choosen_option={category}
                        options={CATEGORIES}
                    />
                    <Button
                        text={ADD_FIELD}
                        clickHandler={() => dispatch(COL_FIELD_ADDED)}
                    />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .buttons_rows {
        display: flex;
        flex-direction: column;
        gap: 1.125rem;
        align-items: stretch;
        flex: 1;
        font-family: Poppins, sans-serif;
    }

    .top {
        display: flex;
        gap: 1.25rem;
        justify-content: start;
    }

    .top_row {
        display: flex;
        justify-content: space-between;
    }

    .top_row__date {
        font-weight: bold;
        font-size: 1.125rem;
        color: var(--logo-background);
    }

    .top_row__date span {
        font-weight: normal;
        font-size: 1rem;
        line-height: 1;
        color: var(--grey);
    }

    .bottom__buttons {
        display: flex;
        gap: 3.75rem;
    }
</style>

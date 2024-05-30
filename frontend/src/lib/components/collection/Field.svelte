<script>
    import DropDown from "$lib/components/Controlls/DropDown.svelte";
    import { FIELD_OPTIONS, ADDITIONAL_FIELD } from "$lib/data/texts.js";
    import { COL_FIELD_REMOVED, COL_FIELD_CHANGED } from "$lib/data/consts.js";
    import Delete from "$lib/components/Controlls/Delete.svelte";
    import { createEventDispatcher } from "svelte";
    import Spinner from "$notification/Spinner.svelte";

    const dispatch = createEventDispatcher();

    export let label = "";
    export let type = "";
    /** @type {?number}*/
    export let orderId = null;
    /**@type {number}*/
    export let id;
    /**@type {number}*/
    export let field_data_id;

    /**
     * @type {boolean} - used to disable buttons mostly on api request
     */
    let disableButtons = false;

    function deleteField() {
        dispatch(COL_FIELD_REMOVED, orderId);
    }

    function setType(e) {
        if (e.detail) {
            type = e.detail;
        }
        if (type) {
            sendEvent();
        }
    }

    function setLabel({ target }) {
        label = target.textContent;
        if (label === "" || label) {
            sendEvent();
        }
    }

    function sendEvent() {
        disableButtons = true;
        dispatch(COL_FIELD_CHANGED, {
            type,
            label,
            field_id: id,
            orderId,
            unBlockButtons,
        });
    }

    function unBlockButtons() {
        disableButtons = false;
    }
</script>

<div class="field">
    <div class="field__controlls">
        <p class="field__label">{ADDITIONAL_FIELD}</p>
        <div class="dropdown">
            <span
                class="dropdown__label"
                contenteditable={true}
                on:blur={setLabel}>{label}</span
            >
            <DropDown
                on:dropdown_changed={setType}
                choosen_option={type}
                options={FIELD_OPTIONS}
                size={"small"}
            />
        </div>
    </div>
    <div class="field__delete">
        <Delete clickHandler={deleteField} />
    </div>
    {#if disableButtons}
        <Spinner />
    {/if}
</div>

<style>
    .field {
        display: flex;
        padding: 0.625rem 1rem;
        background-color: var(--border);
        transition: background 0.4s ease;
        font-family: Poppins, sans-serif;
        border-radius: 10px;
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
        position: relative;
    }

    .field:hover {
        background-color: var(--border-active);
    }

    .field__controlls {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        align-items: start;
        width: 100%;
    }

    .field__label {
        margin: 0;
        font-size: 1rem;
        color: var(--font-grey);
    }

    /** DROPDOWN */
    .dropdown {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        width: 100%;
    }

    .dropdown__label {
        font-size: 0.875rem;
        color: var(--font-main);
        font-weight: bold;
        line-height: 1;
        border: none;
        background: transparent;
        width: 100%;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        overflow: hidden;
    }

    /** DELETE */
    .field__delete {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .field:hover .field__delete {
        opacity: 1;
    }
</style>

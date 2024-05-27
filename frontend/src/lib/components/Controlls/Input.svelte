<script>
    import { DEFAULT_TITLE, ENTER_TAG_NAME } from "$data/texts";
    import { INPUT_CHANGED } from "$data/consts";
    import { createEventDispatcher } from "svelte";

    export let type = "text";
    export let name = DEFAULT_TITLE;
    export let placeholder = "Enter text";
    export let inputEventName = INPUT_CHANGED;

    const dispatch = createEventDispatcher();
    let value = "";

    function inputUpdated(e) {
        const text = e?.target.value ?? "";
        if (text) {
            dispatch(inputEventName, { value: text, callback: clearInput });
        }
    }

    function clearInput() {
        value = "";
    }
</script>

<label for={name}>
    <span>{ENTER_TAG_NAME}:</span>
    <input
        id={name}
        {type}
        {name}
        {value}
        {placeholder}
        on:change={inputUpdated}
    />
</label>

<style>
    label {
        font-family: Poppins, sans-serif;
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    span {
        font-size: 0.875rem;
        font-weight: bold;
        color: var(--dark-violet);
    }

    input {
        background-color: var(--light-grey);
        color: var(--dark-violet);
        border: none;
        border-radius: 10px;
        font-size: 0.75rem;
        padding: 0.625rem;
    }

    input::placeholder {
        color: var(--dark-grey);
    }
</style>

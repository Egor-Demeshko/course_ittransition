<script>
    import DropDown from "./DropDown.svelte";
    import {
        CHOOSE_FIELD,
        ADD_FIELD,
        ENTER_STRING,
        STRING,
        NUMBER,
        ENTER_NUMBER,
        CHECKBOX,
        DATE,
        TEXT,
        ENTER_CHECKBOX,
        ENTER_DATE,
    } from "$data/texts.js";
    import ButtonWithIcon from "./ButtonWithIcon.svelte";
    import { createEventDispatcher } from "svelte";
    import { CREATE_ADDITIONAL, INPUT_CHANGED } from "$data/consts.js";
    import Input from "./Input.svelte";
    import { fly } from "svelte/transition";

    /** @type {import('$types/types').FieldMetaData | null}*/
    export let fieldMetaData = null;

    const dispatch = createEventDispatcher();

    let options = [CHOOSE_FIELD];
    let choosen_option = CHOOSE_FIELD;
    let indexDatachosen = 0;
    let inputValue = "";
    let clearCallback = () => {};
    $: elementToShow = "text";

    $: if (fieldMetaData) {
        let newOptions = [CHOOSE_FIELD];
        for (let data of Object.values(fieldMetaData)) {
            let { type, label } = data;
            newOptions.push(label);
        }

        options = newOptions;
    }

    function fieldIsChoosen(e) {
        if (e.detail === CHOOSE_FIELD) {
            choosen_option = CHOOSE_FIELD;
            elementToShow = "";
            return;
        }
        if (choosen_option !== e.detail) {
            choosen_option = e.detail;
            let choosenLabel = e.detail;

            for (let [key, field] of Object.entries(fieldMetaData)) {
                if (field.label === choosenLabel) {
                    indexDatachosen = +key;

                    elementToShow = field.type;
                    break;
                }
            }
        }
    }

    function addNewField() {
        if (choosen_option === CHOOSE_FIELD) return;
        clearCallback();
        dispatch(CREATE_ADDITIONAL, { index: indexDatachosen, inputValue });
        inputValue = "";
    }

    function inputUpdated(e) {
        inputValue = e.detail.value;
        clearCallback = e.detail.callback;
    }
</script>

<div class="wrapper">
    <div class="left">
        {#if fieldMetaData}
            <DropDown
                lightStyle={true}
                {options}
                {choosen_option}
                on:dropdown_changed={fieldIsChoosen}
            />
        {/if}

        <ButtonWithIcon clickHandler={addNewField}>
            <svg
                slot="icon"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                    fill="currentColor"
                />
            </svg>
            <span slot="text">{ADD_FIELD}</span>
        </ButtonWithIcon>
    </div>
    <div class="right">
        {#if elementToShow === STRING}
            <div in:fly={{ y: 10, delay: 400 }} out:fly={{ y: 30 }}>
                <Input
                    label={ENTER_STRING}
                    inputEventName={INPUT_CHANGED}
                    placeholder={ENTER_STRING}
                    on:input_changed={inputUpdated}
                />
            </div>
        {/if}

        {#if elementToShow === NUMBER}
            <div in:fly={{ y: 10, delay: 400 }} out:fly={{ y: 30 }}>
                <Input
                    type="number"
                    label={ENTER_NUMBER}
                    inputEventName={INPUT_CHANGED}
                    placeholder={ENTER_NUMBER}
                    on:input_changed={inputUpdated}
                />
            </div>
        {/if}

        {#if elementToShow === CHECKBOX}
            <div in:fly={{ y: 10, delay: 400 }} out:fly={{ y: 30 }}>
                <Input
                    type="checkbox"
                    label={ENTER_CHECKBOX}
                    inputEventName={INPUT_CHANGED}
                    placeholder={ENTER_CHECKBOX}
                    on:input_changed={inputUpdated}
                />
            </div>
        {/if}

        {#if elementToShow === DATE}
            <div in:fly={{ y: 10, delay: 400 }} out:fly={{ y: 30 }}>
                <Input
                    type="date"
                    label={ENTER_DATE}
                    inputEventName={INPUT_CHANGED}
                    placeholder={ENTER_DATE}
                    on:input_changed={inputUpdated}
                />
            </div>
        {/if}

        {#if elementToShow === TEXT}
            <div in:fly={{ y: 10, delay: 400 }} out:fly={{ y: 30 }}>
                <Input
                    type="textarea"
                    label={ENTER_NUMBER}
                    inputEventName={INPUT_CHANGED}
                    placeholder={ENTER_NUMBER}
                    on:input_changed={inputUpdated}
                />
            </div>
        {/if}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        gap: 2.5rem;
    }
    .left {
        display: flex;
        gap: clamp(1.5rem, 2.8vw, 2.25rem);
        justify-content: start;
    }

    .left,
    .right {
        flex: 1;
    }

    span {
        font-weight: bold;
    }

    @media screen and (max-width: 780px) {
        .wrapper {
            flex-direction: column;
        }

        .right {
            flex: 0 0 100px;
            overflow: hidden;
        }
    }
</style>

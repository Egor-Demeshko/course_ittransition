<script>
    import Input from "$lib/components/form/Input.svelte";
    import FormErrors from "$lib/components/form/FormErrors.svelte";
    import { formToOpen } from "$lib/components/TopSideBar.svelte";
    import { fade, fly } from "svelte/transition";
    import { fields } from "$lib/data/fields.js";
    import { request } from "$lib/scripts/form/request.js";
    import {
        successNotificationType,
        errorNotificationType,
        addNotification,
    } from "$lib/components/notification/notification.js";

    export let data;

    /**
     * @type {{type: string, heading: string, primaryButtonText: string, method: string}}
     */
    let { type: formType, heading, primaryButtonText, method } = data;
    let formFields = fields[formType];

    let show = false;

    /**
     * @type {[]}
     */
    let generalErrors = [];

    formToOpen.subscribe((value) => {
        show = value === formType;
    });

    /**
     *
     * @param {Event} e
     */
    function closeModal(e) {
        /** @type {?EventTarget|HTMLFormElement} */
        const target = e?.target;
        // @ts-ignore
        if (target && target.classList.contains("background")) {
            formToOpen.set("");
        }
    }

    /**
     * @param {Event} e
     */
    async function submit(e) {
        removeErrors();
        // @ts-ignore
        let formData = new FormData(e.target);
        /**
         * @type {{status: boolean, success_message: string, errors: [{field: string, message: string}]}}
         */
        let result = await request(formType, formData);
        if (result.status) {
            addNotification(successNotificationType, result.success_message);
            formToOpen.set("");
        } else {
            showErrors(result.errors);
            addNotification(
                errorNotificationType,
                "Error occured during form sending!"
            );
        }
    }

    /**
     *
     * @param {[{field: string, message: string}]} errors
     */
    function showErrors(errors) {
        for (let error of errors) {
            let field = formFields[error?.field] ?? null;

            if (field !== "general") {
                field.invalid = true;
                field.error = error.message;
            } else {
                // @ts-ignore
                generalErrors.push(error.message);
            }
        }

        formFields = formFields;
    }

    function removeErrors() {
        for (let field of Object.values(formFields)) {
            if (field.invalid) {
                field.invalid = false;
                field.error = null;
            }
        }

        formFields = formFields;
        generalErrors = [];
    }
</script>

{#if show}
    <div
        class="background"
        on:click={closeModal}
        on:keydown={(e) => e.key === "Escape" && closeModal(e)}
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300, delay: 300 }}
        role="button"
        tabindex="0"
    >
        <form
            in:fly={{ duration: 300, delay: 300, x: -100 }}
            out:fly={{ duration: 300, x: -100 }}
            on:submit|preventDefault={submit}
            {method}
            name={formType}
        >
            <h3>{heading}</h3>

            {#if generalErrors.length > 0}
                <FormErrors errors={generalErrors} />
            {/if}

            {#each Object.values(formFields) as { type, name, value, invalid, error, label, show_eye = false, placeholder }}
                <Input
                    {formType}
                    {type}
                    {name}
                    {value}
                    {invalid}
                    {error}
                    {label}
                    {show_eye}
                    {placeholder}
                />
            {/each}

            <div class="buttons">
                <button
                    type="button"
                    class="cancel"
                    on:click={() => formToOpen.set("")}>Cancel</button
                >
                <button type="submit" class="submit">{primaryButtonText}</button
                >
            </div>
        </form>
    </div>
{/if}

<style>
    .background {
        background-color: var(--background-transparent);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Poppins, sans-serif;
    }

    h3 {
        margin-bottom: 1rem;
    }

    form {
        width: clamp(320px, 100%, 580px);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        background: var(--background);
        padding: 1.5rem 1.25rem;
        border-radius: 0.5rem;
        border: 2px solid var(--border);
    }

    /**BUTTONS*/
    .buttons {
        display: flex;
        justify-content: space-around;
    }

    button {
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 4px;
        color: var(--logo-color);
        font-weight: 600;
        font-size: 0.875rem;
        transition: background 0.4s ease;
        cursor: pointer;
    }

    button.submit {
        background-color: var(--button-main);
    }

    button.cancel {
        background-color: var(--danger);
    }

    button.cancel:hover {
        background-color: var(--danger-accent);
    }
    button.submit:hover {
        background-color: var(--button-main-hover);
    }
</style>

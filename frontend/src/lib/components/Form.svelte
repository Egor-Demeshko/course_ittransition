<script>
    import Input from "$lib/components/form/Input.svelte";
    import { formToOpen } from "$lib/components/TopSideBar.svelte";
    import { fade, fly } from "svelte/transition";
    import { fields } from "$lib/data/fields.js";
    import { request } from "$lib/scripts/form/request.js";

    export let data;

    /**
     * @type {{type: string, heading: string, primaryButtonText: string, method: string}}
     */
    let { type, heading, primaryButtonText, method } = data;

    let show = false;

    formToOpen.subscribe((value) => {
        show = value === type;
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

    async function submit(e) {
        let formData = new FormData(e.target);
        await request(type, formData);
    }
</script>

{#if show}
    <div
        class="background"
        on:click={closeModal}
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300, delay: 300 }}
    >
        <form
            in:fly={{ duration: 300, delay: 300, x: -100 }}
            out:fly={{ duration: 300, x: -100 }}
            on:submit|preventDefault={submit}
            {method}
            data-route={type}
        >
            <h3>{heading}</h3>

            {#each fields[type] as { type, name, value, invalid, error, label, show_eye = false }}
                <Input
                    {type}
                    {name}
                    {value}
                    {invalid}
                    {error}
                    {label}
                    {show_eye}
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

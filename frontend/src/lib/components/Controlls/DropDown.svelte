<script>
    import { onMount } from "svelte";
    import { DROPDOWN_CHANGED } from "$lib/data/consts.js";
    import { writable } from "svelte/store";
    import { createEventDispatcher } from "svelte";

    export let choosen_option = "";
    /**
     * @type {string}
     */
    export let size = "";
    /**
     * @type {string[]}
     */
    export let options = [];

    const dispatch = createEventDispatcher();

    /**
     * @type {HTMLElement} - Выбранная опция. Связывается через bind:this в разметке
     */
    let selected;
    let selectOpen = false;
    const topcTags = options;

    $: selected_id = choosen_option;

    onMount(() => {
        selected.style.borderRadius = "10px";
    });

    /**
     *
     * @arg {KeyboardEvent} e
     */
    function selectMainClick(e) {
        //получить дата аттрибут
        if (selectOpen && e.target?.dataset?.selectId) {
            const option = e.target.dataset.selectId;

            dispatch(DROPDOWN_CHANGED, option);
        }
        selectOpen = !selectOpen;
    }

    /**@description Анимация дропдауна в обоих направлениях
     * @arg {HTMLElement} node
     * @arg {{ duration: number }} options
     */
    function dropwdown(node, { duration }) {
        /** правильное
         *  отображение скругленных углов */
        if (selectOpen) {
            selected.style.borderRadius = "10px 10px 0 0";
        } else {
            setTimeout(() => {
                selected.style.borderRadius = "10px";
            }, duration + 10);
        }
        return {
            delay: 0,
            duration,
            css: (t) => `transform: scaleY(${t})`,
        };
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="select {size}" class:selectOpen on:click={selectMainClick}>
    <div
        bind:this={selected}
        tabindex="0"
        role="option"
        aria-selected
        class="option option_selected"
        data-select-id={selected_id}
        on:keydown={(e) => {
            if (e.key === "Enter") {
                selectOpen = !selectOpen;
            }
        }}
    >
        <span>{selected_id}</span>
        <svg
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
        >
            <path
                d="M17 1L9 8.27273L1 1"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>

    {#if selectOpen}
        <div
            class="dropdown"
            in:dropwdown={{ duration: 200 }}
            out:dropwdown={{ duration: 200 }}
            aria-live="polite"
        >
            {#each topcTags as tag}
                {#if selected_id !== tag}
                    <div
                        data-select-id={tag}
                        role="option"
                        aria-selected="false"
                        class="option"
                        tabindex="0"
                    >
                        {tag}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .select {
        border-radius: 10px;
        position: relative;
        transition: background-color 0.3s ease;
        font-size: 1rem;
        line-height: 1;
        color: var(--font-white);
        flex: 1;
    }

    .select {
        border-radius: 10px;
    }
    .option_selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .option_selected svg {
        width: 20px;
        height: 12px;
    }

    .icon {
        transform-origin: center center;
        transition: transform 0.4s ease;
    }

    /** SELECTE OPEN STATE */
    .select.selectOpen,
    .select.selectOpen > .option_selected {
        border-radius: 10px 10px 0 0;
    }

    .select.selectOpen {
        z-index: 10;
    }

    .selectOpen .icon {
        transform: rotate(180deg);
    }
    /** --- END SELECTE OPEN STATE --- */

    .dropdown {
        position: absolute;
        left: 0;
        right: 0;
        border-radius: 0 0 10px 10px;
        transform-origin: top center;
    }

    /** SINGLE OPTION */
    .option {
        padding: 0.75rem 1.25rem;
        transition: background-color 0.3s ease;
        background-color: var(--logo-background);
        font-family: Poppins, sans-serif;
        font-weight: bold;
        cursor: pointer;
    }
    .selectOpen > .dropdown > .option:last-child {
        border-radius: 0 0 10px 10px;
    }

    .option:hover {
        background-color: var(--button-main-hover);
    }
    /* --- END SINGLE OPTION --- */

    /** SMALL SIZE */
    .select.small {
        font-size: 0.875rem;
        flex: 0 0 clamp(100px, 18vw, 140px);
    }

    .small .option {
        padding: 0.32rem 0.75rem;
    }

    .small .option_selected svg {
        width: 18px;
        height: 10px;
    }
</style>

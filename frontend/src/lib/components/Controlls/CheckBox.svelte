<script>
    import { checkboxes } from "$components/Controlls/stores/checkboxesStore.js";

    /** @type {number}*/
    export let id;

    let value = false;
    /**
     * @type {HTMLInputElement}
     */
    let input;

    checkboxes.subscribe((checkObjs) => {
        if (checkObjs[id] && checkObjs[id].selected !== value) {
            value = checkObjs[id].selected;
        }
    });

    function clickHandle(e) {
        value = !value;
        // @ts-ignore
        checkboxes.update((checksMap) => {
            // if record with id present, set selected property equal value
            if (checksMap[id] && checksMap[id].selected !== value) {
                checksMap[id].selected = value;
            } else {
                // if not, add new one
                checksMap[id] = { id, selected: value };
            }

            return checksMap;
        });
    }
</script>

<div class="checkbox" on:click={clickHandle}>
    <input type="checkbox" bind:this={input} checked={value} />
    <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17 1L6 12L1 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</div>

<style>
    .checkbox {
        position: relative;
        width: 28px;
        height: 28px;
        border-radius: 10px;
        border: 2px solid var(--logo-background);
        background-color: var(--border);
        cursor: pointer;
        transition: background 0.4s ease;
    }

    .checkbox:hover {
        background-color: var(--light-violet);
    }

    input {
        visibility: hidden;
        width: 1px;
        height: 1px;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        color: var(--violet);
        transition:
            color 0.4s ease,
            transform 0.3s ease;
    }

    .checkbox:hover svg {
        color: var(--dark-violet);
    }

    input:checked ~ svg {
        transform: translate(-50%, -50%) scale(1);
    }
</style>

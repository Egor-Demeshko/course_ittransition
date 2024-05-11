<script>
    import { PASSWORD } from "$lib/data/consts.js";

    export let type = "text";
    export let name = "";
    /** @type {?string} */
    export let value = "";
    export let invalid = true;
    export let placeholder = "";
    /** @type {?string}*/
    export let error = null;
    export let label = "";
    /** @type {?boolean}*/
    export let show_eye = null;

    // @ts-ignore
    function validate({ target }) {
        let result = target.checkValidity();

        if (result) {
            invalid = false;
            error = null;
        } else {
            invalid = true;
            error = target.validationMessage;
        }
    }
</script>

<div class:invalid>
    <label for={name}>{error ? error : label}</label>
    <div class="input_wrapper">
        <input {type} {name} {value} {placeholder} on:change={validate} />

        {#if show_eye}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                on:click={() =>
                    (type = type === PASSWORD ? "text" : "password")}
            >
                <g clip-path="url(#clip0_6_51)">
                    <path
                        d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17.005 19.5 21.27 16.39 23 12C21.27 7.61 17.005 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.345 9 9 10.345 9 12C9 13.655 10.345 15 12 15C13.655 15 15 13.655 15 12C15 10.345 13.655 9 12 9Z"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_6_51">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        {/if}
    </div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .input_wrapper {
        position: relative;
    }

    input {
        padding: 0.3rem 0.5rem;
        border: none;
        border-radius: 5px;
        outline: 2px solid var(--border);
        transition: outline ease 0.4s;
    }

    svg {
        cursor: pointer;
        color: var(--button-main);
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translateY(-50%);
        transition: color 0.4s ease;
    }

    svg:hover {
        color: var(--button-main-hover);
    }

    input:hover,
    input:focus {
        outline: 2px solid var(--border-active);
    }

    .invalid input {
        outline: 2px solid var(--danger);
    }

    .invalid label {
        color: var(--danger);
    }
</style>

<script>
    import { AVATAR } from "$lib/data/texts.js";
    import { saveFile } from "$lib/scripts/imageupload/imageupload.js";
    import Spinner from "$lib/components/notification/Spinner.svelte";
    import { COL_IMAGE_CHANGED } from "$lib/data/consts.js";
    import { createEventDispatcher } from "svelte";

    export let image_link;

    const dispatch = createEventDispatcher();

    let spinner = false;

    async function uploadFile({ target }) {
        spinner = true;
        const file = target.files[0];
        if (file) {
            let fileUrl = await saveFile(file);
            spinner = false;

            dispatch(COL_IMAGE_CHANGED, fileUrl);
        }
    }
</script>

<div class="button">
    {#if !image_link}
        <div class="inner">
            <div class="icon">
                <svg
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M28.238 16.342H16.736V28.006H12.146V16.342H0.698V12.184H12.146V0.465997H16.736V12.184H28.238V16.342Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <p class="label">
                {AVATAR}
            </p>
        </div>

        <input
            type="file"
            name="file"
            accept="image/*"
            on:change={uploadFile}
        />
    {:else}
        <img src={image_link} alt="avatar" />
    {/if}
    {#if spinner}
        <Spinner />
    {/if}
</div>

<style>
    .button {
        border: none;
        width: 6.375rem;
        height: 6.375rem;
        border-radius: 10px;
        color: var(--font-white);
        font-family: Poppins, sans-serif;
        cursor: pointer;
        background-color: var(--button-main);
        transition: background 0.4s ease;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .button:hover {
        background-color: var(--button-main-hover);
    }

    input {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        opacity: 0;
    }

    .label {
        font-size: 0.875rem;
        line-height: 1;
        font-weight: bold;
        margin-top: 0.6rem;
    }

    img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
</style>

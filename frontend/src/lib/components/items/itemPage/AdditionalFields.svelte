<script>
    import Buttons from "$components/Controlls/Buttons.svelte";
    import { singleItemStore } from "$components/items/itemPage/singleItemStore";
    import { createAdditionalContent } from "$lib/scripts/additionalFields/createAdditionalContent";
    import ContentField from "./ContentField.svelte";

    /** @type {import('$types/types').FieldMetaData | null}*/
    let fieldMetaData = null;
    /** @type {number | null}*/
    let itemId = null;

    /** @type {Array<import('$types/types').AdditionalContent>}*/
    let additionalContent = [];

    singleItemStore.subscribe((item) => {
        fieldMetaData = item.fieldMetaData ?? null;
        itemId = item.id;
        additionalContent = item.additional_content;
    });

    function createAdditional(e) {
        const additionalToCreateIndex = e.detail.index;
        const inputValue = e.detail.inputValue;

        // we will create dataContent, and we need itemId, and additionalToCreateIndex
        createAdditionalContent(itemId, additionalToCreateIndex, inputValue);
    }
</script>

<Buttons {fieldMetaData} on:create_additional={createAdditional} />

<div class="additional">
    {#if additionalContent.length > 0}
        {#key additionalContent}
            {#each additionalContent as singleAdditionalContent}
                <div class="field">
                    <ContentField additionalContent={singleAdditionalContent} />
                </div>
            {/each}
        {/key}
    {/if}
</div>

<style>
    .additional {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding-top: clamp(1.5rem, 4.5vw, 3.375rem);
        gap: 1rem;
    }

    @media screen and (max-width: 780px) {
        .additional {
            grid-template-columns: 1fr;
        }
    }
</style>

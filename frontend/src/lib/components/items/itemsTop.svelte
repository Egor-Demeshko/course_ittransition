<script>
    import AddButton from "$components/Controlls/AddButton.svelte";
    import ItemsHeading from "$components/items/ItemsHeading.svelte";
    import ItemControls from "$components/items/ItemControls.svelte";
    import { updateCollectionSingleField } from "$fetcher/collection/utils/updateCollectionSingleField";
    import Spinner from "$notification/Spinner.svelte";
    import {
        addNotification,
        successNotificationType,
    } from "$notification/notification";
    import { COLLECTION_UPDATED } from "$data/texts";
    import { addItem } from "$items/addItem";

    export let data;
    let blockImage = false;

    /**
     * @param {number} id  - Collection id
     */
    let { modified_at, image_link, id, title } = data;

    async function addItemWithCOllectionId() {
        return await addItem(id);
    }

    async function setImageLink({ detail }) {
        let reserved = image_link;
        blockImage = true;
        image_link = detail;

        let result = await updateCollectionSingleField(id, { image_link });
        if (result && result.status) {
            // @ts-ignore
            for (let obj of result?.data || []) {
                if (obj.modified_at) modified_at = obj.modified_at;
            }
            addNotification(successNotificationType, COLLECTION_UPDATED);
        } else if (!result?.status) {
            image_link = reserved;
            // @ts-ignore
            for (let error of result?.errors) {
                // @ts-ignore
                addNotification(errorNotificationType, error.message);
            }
        }

        blockImage = false;
    }
</script>

<div class="items">
    <div>
        <AddButton {image_link} on:image_changed={setImageLink} />
        {#if blockImage}
            <Spinner />
        {/if}
    </div>
    <div class="data">
        <div class="headings">
            <ItemsHeading {id} {modified_at} {title} />
        </div>
        <div class="controls">
            <ItemControls addItem={addItemWithCOllectionId} />
        </div>
    </div>
</div>

<style>
    .items {
        display: flex;
        gap: 2.125rem;
        padding: 2.875rem 0 1.875rem;
        width: 100%;
    }

    .data {
        display: flex;
        gap: 2.125rem;
        flex: 1;
    }

    .headings {
        display: flex;
        flex: 1;
    }

    .controls {
        display: flex;
        align-items: end;
    }

    @media screen and (max-width: 760px) {
        .data {
            flex-direction: column;
        }
    }
</style>

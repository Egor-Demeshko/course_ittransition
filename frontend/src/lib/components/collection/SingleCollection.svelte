<script>
    import LeftCollection from "$lib/components/collection/LeftCollection.svelte";
    import RightCollection from "$lib/components/collection/RightCollection.svelte";
    import Fields from "$lib/components/collection/Fields.svelte";
    import { ENTER_NAME, CATEGORIES, COLLECTION_ID } from "$lib/data/texts.js";
    import {
        apimap,
        COLLECTION,
        UPDATE,
        CATHEGORY,
    } from "$lib/scripts/fetcher/apimap.js";
    import { isToken } from "$lib/scripts/token/token.js";
    import {
        STORAGE_LOCAL,
        getDataFromStorage,
    } from "$lib/scripts/storages/storages";
    import { RefreshTokenError } from "$lib/scripts/errors/RefreshTokenError.js";
    import { SaveError } from "$lib/scripts/errors/SaveError.js";
    import {
        addNotification,
        errorNotificationType,
        successNotificationType,
    } from "$lib/components/notification/notification.js";

    /**
     * @type {import('$types/types.js').Collection}
     */
    export let collection;

    let { id, title, description, image_link, modified_at, fields, category } =
        collection;

    function setCategory({ detail }) {
        category = detail;
    }

    function addField() {
        fields = [...fields, { label: ENTER_NAME, type: "string" }];
    }

    function setImage({ detail }) {
        image_link = detail;
    }

    async function saveCollection() {
        let cathegory_id = CATEGORIES.reduce(
            (pr, current, i) => (current === category ? pr + i + 1 : pr),
            0
        );

        const sendObj = {
            title,
            description,
            image_link,
            cathegory: `/api/${CATHEGORY}/${cathegory_id}`,
        };

        try {
            if (await isToken()) {
                const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);
                if (!dataFromStorage) return;
                const token = JSON.parse(dataFromStorage)["token"];

                const response = await apimap[COLLECTION][UPDATE](
                    id,
                    JSON.stringify(sendObj),
                    token
                );

                if (response.status) {
                    const time = response?.data["modified_at"] ?? modified_at;
                    if (time !== modified_at) {
                        modified_at = time;
                    }
                    addNotification(
                        successNotificationType,
                        response.success_message
                    );
                }
            }
        } catch (e) {
            if (e instanceof RefreshTokenError || e instanceof SaveError) {
                addNotification(errorNotificationType, e.message);
            }
        }
    }
</script>

<section>
    <div class="left">
        <LeftCollection bind:title bind:description />
    </div>
    <div class="right">
        <RightCollection
            {image_link}
            {modified_at}
            {category}
            on:dropdown_changed={setCategory}
            on:col_field_added={addField}
            on:save_collection={saveCollection}
            on:image_changed={setImage}
        />
        <hr />
        {#if fields}
            <Fields {fields} />
        {/if}
    </div>
    <span>{COLLECTION_ID}: ${id}</span>
</section>

<hr style="margin: 0" />

<style>
    section {
        display: flex;
        padding-top: 4.5rem;
        padding-bottom: 2rem;
        gap: 1.75rem;
        position: relative;
    }

    span {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        font-size: 0.875rem;
        color: var(--font-grey);
    }

    .left {
        flex: 1;
    }

    .right {
        flex: 1.28;
    }

    hr {
        border: 2px solid var(--border-active);
        border-radius: 2px;
        margin: 1.125rem 0;
    }
</style>

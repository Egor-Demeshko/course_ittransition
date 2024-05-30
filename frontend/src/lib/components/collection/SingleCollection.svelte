<script>
    import LeftCollection from "$lib/components/collection/LeftCollection.svelte";
    import RightCollection from "$lib/components/collection/RightCollection.svelte";
    import Fields from "$lib/components/collection/Fields.svelte";
    import {
        ENTER_NAME,
        CATEGORIES,
        COLLECTION_ID,
        GENERAL_ERROR,
        COLLECTION_DELETED as COLLECTION_DELETED_TEXT,
        ADDITIONAL_FIELD_ADDED,
        GO_TO_COLLECTION,
    } from "$lib/data/texts.js";
    import {
        apimap,
        COLLECTION,
        UPDATE,
        CATHEGORY,
        DELETE,
        ADDITIONAL_FIELD,
        CREATE,
    } from "$lib/scripts/fetcher/apimap.js";
    import { isToken } from "$lib/scripts/token/token.js";
    import {
        STORAGE_LOCAL,
        getDataFromStorage,
    } from "$lib/scripts/storages/storages";
    import { RefreshTokenError } from "$lib/scripts/errors/RefreshTokenError.js";
    import { SaveError } from "$lib/scripts/errors/SaveError.js";
    import { DeleteError } from "$errors/DeleteError.js";
    import { AdditionalFieldError } from "$errors/AdditionalFieldError.js";
    import { NormalizationError } from "$errors/NormalizationError.js";
    import {
        addNotification,
        errorNotificationType,
        successNotificationType,
    } from "$lib/components/notification/notification.js";
    import { COLLECTION_DELETED } from "$data/consts.js";
    import { additionalFieldToApp } from "$normolizers/additionalfieldToApp";
    import { createEventDispatcher } from "svelte";
    import Button from "$components/Controlls/Button.svelte";
    import { goto } from "$app/navigation";

    /**
     * @type {import('$types/types.js').Collection}
     */
    export let collection;

    const dispatch = createEventDispatcher();

    let { id, title, description, image_link, modified_at, fields, category } =
        collection;

    function setCategory({ detail }) {
        category = detail;
    }

    async function addField() {
        try {
            if (await isToken()) {
                const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);
                if (!dataFromStorage) return;
                const token = JSON.parse(dataFromStorage)["token"];

                const result = await apimap[ADDITIONAL_FIELD][CREATE](
                    id,
                    token
                );
                if (result) {
                    addNotification(
                        successNotificationType,
                        ADDITIONAL_FIELD_ADDED
                    );
                    const receivedObj = additionalFieldToApp(result);

                    fields = [receivedObj, ...fields];
                }
            }
        } catch (e) {
            if (
                e instanceof RefreshTokenError ||
                e instanceof AdditionalFieldError ||
                e instanceof NormalizationError
            ) {
                addNotification(errorNotificationType, e.message);
            } else {
                addNotification(errorNotificationType, GENERAL_ERROR);
            }
            console.error(e);
        }
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
            } else {
                console.error(e);
                addNotification(errorNotificationType, GENERAL_ERROR);
            }
        }
    }

    async function deleteCollection() {
        try {
            if (await isToken()) {
                const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);
                if (!dataFromStorage) return;
                const token = JSON.parse(dataFromStorage)["token"];

                const result = await apimap[COLLECTION][DELETE](id, token);
                if (result) {
                    addNotification(
                        successNotificationType,
                        COLLECTION_DELETED_TEXT
                    );
                    dispatch(COLLECTION_DELETED, id);
                }
            }
        } catch (e) {
            if (e instanceof RefreshTokenError || e instanceof DeleteError) {
                addNotification(errorNotificationType, e.message);
            } else {
                console.error(e);
                addNotification(errorNotificationType, GENERAL_ERROR);
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
            on:delete_collection={deleteCollection}
        />
        <hr />
        {#if fields}
            <Fields {fields} />
        {/if}
    </div>
    <span>{COLLECTION_ID}: {id}</span>
</section>

<Button
    text={GO_TO_COLLECTION}
    clickHandler={() => goto(`/single-collection/${id}`)}
/>

<hr style="margin-top: 1rem" />

<style>
    section {
        display: flex;
        padding-top: clamp(1.5rem, 6vw, 4.5rem);
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

    @media screen and (max-width: 980px) {
        section {
            flex-direction: column;
        }
    }
</style>

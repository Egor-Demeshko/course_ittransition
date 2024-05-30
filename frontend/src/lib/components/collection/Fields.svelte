<script>
    import Field from "$lib/components/collection/Field.svelte";
    import {
        ADDITIONAL_FIELD_DELETED,
        ERROR_DUE_INTERFACE,
        ADDITIONAL_FIELD_UPDATED,
    } from "$lib/data/texts.js";
    import { isToken } from "$token/token.js";
    import { getDataFromStorage, STORAGE_LOCAL } from "$storage/storages";
    import {
        addNotification,
        successNotificationType,
        errorNotificationType,
    } from "$notification/notification";
    import { apimap, ADDITIONAL_FIELD, DELETE, UPDATE } from "$fetcher/apimap";
    import { RefreshTokenError } from "$errors/RefreshTokenError.js";
    import { DeleteError } from "$errors/DeleteError";
    import { UpdateError } from "$errors/UpdateError";
    import Spinner from "$notification/Spinner.svelte";
    import { handleFrontError } from "$errors/functions/handleFrontError";

    let showSpinner = false;
    /**
     * @type {import('$types/types.js').AdditionalFieldLink[]}
     */
    export let fields = [];
    async function changeFieldData({ detail }) {
        let { type, label, field_id, unBlockButtons, orderId } = detail;
        console.log(unBlockButtons);
        if (typeof field_id !== "number" || !field_id) {
            addNotification(errorNotificationType, ERROR_DUE_INTERFACE);
            unBlockButtons();
            return;
        }

        try {
            if (await isToken()) {
                const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);
                if (!dataFromStorage) throw new RefreshTokenError();
                const token = JSON.parse(dataFromStorage)["token"];
                const objToSend = {
                    field_data: {
                        type,
                        label,
                    },
                };

                const result = await apimap[ADDITIONAL_FIELD][UPDATE](
                    field_id,
                    token,
                    JSON.stringify(objToSend)
                );
                if (result) {
                    addNotification(
                        successNotificationType,
                        ADDITIONAL_FIELD_UPDATED
                    );
                }
            }
        } catch (e) {
            handleFrontError(e, {
                [UpdateError.name]: UpdateError,
                [RefreshTokenError.name]: RefreshTokenError,
            });
        }

        unBlockButtons();

        fields.forEach((fieldData, i) => {
            if (orderId !== i) return;

            if ((type && orderId) || (type && orderId === 0)) {
                fieldData["type"] = type;
            }
        });

        fields = fields;
    }

    async function removeField({ detail }) {
        let orderId = detail;

        const id = fields[orderId]["id"];
        showSpinner = true;

        if (typeof orderId !== "number" || !id) {
            addNotification(errorNotificationType, ERROR_DUE_INTERFACE);
            showSpinner = false;
            return;
        }

        try {
            if (await isToken()) {
                const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);
                if (!dataFromStorage) throw new RefreshTokenError();
                const token = JSON.parse(dataFromStorage)["token"];

                const result = await apimap[ADDITIONAL_FIELD][DELETE](
                    id,
                    token
                );
                if (result) {
                    addNotification(
                        successNotificationType,
                        ADDITIONAL_FIELD_DELETED
                    );

                    if (orderId || orderId === 0) {
                        fields = fields.filter((_, i) => !(i === orderId));
                    }
                }
            }
        } catch (e) {
            handleFrontError(e, {
                [DeleteError.name]: DeleteError,
                [RefreshTokenError.name]: RefreshTokenError,
            });
        }
        showSpinner = false;
    }
</script>

<div class="fields">
    {#each fields as { id, field_data_id, label, type }, i}
        <Field
            {id}
            {field_data_id}
            {label}
            {type}
            orderId={i}
            on:col_field_changed={changeFieldData}
            on:col_field_removed={removeField}
        />
    {/each}
    {#if showSpinner}
        <Spinner />
    {/if}
</div>

<style>
    .fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.375rem;
        flex-wrap: wrap;
        position: relative;
    }

    @media screen and (max-width: 580px) {
        .fields {
            grid-template-columns: 1fr;
        }
    }
</style>

import {
    checkboxes,
    clearCheckboxes,
} from "$components/Controlls/stores/checkboxesStore";
import { apimap, DELETE_ITEMS, COLLECTION, ITEM } from "$fetcher/apimap";
import { get } from "svelte/store";
import { DeleteItemsError } from "$errors/DeleteItemsError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { RefreshTokenError } from "$errors/RefreshTokenError";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { clearSelectedItemsStore } from "$components/items/itemsStores";

/**
 * @param {Event} e
 * @param {number} collection_id
 */
export async function deleteSelectedItems(e, collection_id) {
    const idsToStay = [];
    const idsToDelete = [];
    const checkboxesValues = get(checkboxes);

    for (const value of Object.values(checkboxesValues)) {
        if (value.selected === false) {
            idsToStay.push(`api/${ITEM}/${value.id}`);
        } else if (value.selected === true) {
            idsToDelete.push(value.id);
        }
    }

    if (idsToStay.length === 0) return;

    try {
        const token = await getTokenForRequest();
        const result = await apimap[COLLECTION][DELETE_ITEMS](
            collection_id,
            JSON.stringify({ items: idsToStay }),
            token
        );
        clearSelectedItemsStore(idsToDelete);
        clearCheckboxes(idsToDelete);
    } catch (e) {
        handleFrontError(e, {
            [DeleteItemsError.name]: DeleteItemsError,
            [RefreshTokenError.name]: RefreshTokenError,
        });
    }
}

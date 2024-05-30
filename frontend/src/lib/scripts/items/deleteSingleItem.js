import { DeleteItemsError } from "$errors/DeleteItemsError";
import { RefreshTokenError } from "$errors/RefreshTokenError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { ITEM, apimap, DELETE } from "$fetcher/apimap";
import {
    addNotification,
    successNotificationType,
} from "$notification/notification";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { ITEM_DELETED } from "$data/texts";
import { deleteSingleItemFromStore } from "$components/items/itemsStores";
import { clearCheckboxes } from "$components/Controlls/stores/checkboxesStore";

/**
 *
 * @param {number} id
 */
export async function deleteSingleItem(id) {
    try {
        const token = getTokenForRequest();
        const result = await apimap[ITEM][DELETE](id, token);
        if (result) {
            addNotification(successNotificationType, ITEM_DELETED);
            deleteSingleItemFromStore(id);
            clearCheckboxes([id]);
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [DeleteItemsError.name]: DeleteItemsError,
        });
    }
}

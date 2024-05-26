import { RefreshTokenError } from "$errors/RefreshTokenError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { UpdateItemError } from "$errors/item/UpdateItemError";
import { ITEM, UPDATE, apimap } from "$fetcher/apimap";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { ITEM_UPDATE_SUCCESS } from "$data/texts";
import {
    addNotification,
    successNotificationType,
} from "$notification/notification";

/**
 *
 * @param {number} id
 * @param {Record<string, any>} dataRaw
 */
export async function updateItem(id, dataRaw) {
    try {
        const token = getTokenForRequest();
        if (!token) {
            throw new RefreshTokenError();
        }

        const result = await apimap[ITEM][UPDATE](
            id,
            JSON.stringify(dataRaw),
            token
        );

        if (result) {
            addNotification(successNotificationType, ITEM_UPDATE_SUCCESS);
            return result;
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [UpdateItemError.name]: UpdateItemError,
        });
    }
}

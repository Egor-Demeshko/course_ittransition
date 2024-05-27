import { singleItemStore } from "$components/items/itemPage/singleItemStore";
import { RefreshTokenError } from "$errors/RefreshTokenError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { TagDeleteError } from "$errors/tag/TagDeleteError";
import { DELETE, TAGLINK, apimap } from "$fetcher/apimap";
import {
    addNotification,
    successNotificationType,
} from "$notification/notification";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { TAG_DELETED } from "$data/texts";

/**
 *
 * @param {number} id - taglink id
 */
export async function deleteTagLink(id) {
    try {
        const token = getTokenForRequest();
        if (!token) return;

        const result = await apimap[TAGLINK][DELETE](id, token);
        if (result) {
            deleteTagOnFront(id);
            addNotification(successNotificationType, TAG_DELETED);
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [TagDeleteError.name]: TagDeleteError,
        });
    }
}

function deleteTagOnFront(id) {
    singleItemStore.deleteTag(id);
}

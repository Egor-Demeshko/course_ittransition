import { RefreshTokenError } from "$errors/RefreshTokenError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { apimap, TAGLINK, CREATE } from "$fetcher/apimap";
import { TagCreateError } from "$errors/tag/TagCreateError";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { NO_REQUEST_OBJ } from "$data/texts";
import { InvalidDataError } from "$errors/InvalidDataError";
import { customHandlerError } from "$errors/functions/customHandlerError";
import { singleItemStore } from "$components/items/itemPage/singleItemStore";

/**
 *
 * @param {import('$types/types').tagCreate|undefined} objRaw
 * @returns
 */
export async function makeAddTagRequest(objRaw) {
    try {
        if (!objRaw) throw new TagCreateError(NO_REQUEST_OBJ);
        let token = await getTokenForRequest();

        if (!token) return;

        let result = await apimap[TAGLINK][CREATE](
            JSON.stringify(objRaw),
            token
        );

        if (result.status) {
            singleItemStore.addTag(result.body);
        } else {
            customHandlerError(result);
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [TagCreateError.name]: TagCreateError,
            [InvalidDataError.name]: InvalidDataError,
        });
    }
}

import { RefreshTokenError } from "$errors/RefreshTokenError";
import { AdditionalContentCreateError } from "$errors/additionalField/AdditionalContentCreate";
import { handleFrontError } from "$errors/functions/handleFrontError";
import {
    ADDITIONAL_CONTENT,
    CREATE,
    apimap,
    ITEM,
    ADDITIONAL_FIELD_DATA,
} from "$fetcher/apimap";
import { getTokenForRequest } from "$token/getTokenForRequest";
import { singleItemStore } from "$components/items/itemPage/singleItemStore";

/**
 * @param {?number} itemId
 * @param {number} dataId
 * @param {string} content
 */
export async function createAdditionalContent(itemId, dataId, content) {
    if (!itemId) return;

    try {
        const token = await getTokenForRequest();

        const body = {
            content,
            additional_data: `/api/${ADDITIONAL_FIELD_DATA}/${dataId}`,
            item: `/api/${ITEM}/${itemId}`,
        };

        const result = await apimap[ADDITIONAL_CONTENT][CREATE](
            JSON.stringify(body),
            token
        );

        if (result) {
            singleItemStore.addAdditionalContent(result);
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [AdditionalContentCreateError.name]: AdditionalContentCreateError,
        });
    }
}

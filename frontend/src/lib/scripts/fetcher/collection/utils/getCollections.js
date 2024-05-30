import { prepareAdditionalFields } from "$normolizers/prepareAdditionalField.js";
import {
    USER,
    apimap,
    COLLECTIONS_PER_USER,
} from "$lib/scripts/fetcher/apimap.js";
import { SERVER_TYPE } from "$fetcher/apiRequests";

/**
 * @param {number} user_id
 * @param {number} page
 * @param {string} requestType
 */
export async function getCollections(
    user_id,
    page = 1,
    requestType = SERVER_TYPE
) {
    const result = await apimap[USER][COLLECTIONS_PER_USER](
        user_id,
        page,
        requestType
    );
    const normolizedResult = prepareAdditionalFields(result);
    normolizedResult["hydra:totalItems"] = result["hydra:totalItems"] ?? null;
    return normolizedResult;
}

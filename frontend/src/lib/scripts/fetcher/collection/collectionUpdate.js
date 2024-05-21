import { request } from "$fetcher/fetcher.js";
import { COLLECTION } from "$fetcher/apimap.js";
import { apiRoute } from "$fetcher/apiRequests.js";
import { SaveError } from "$errors/SaveError.js";
import { getResponseObjWithData } from "$utils/getResponseObj.js";
import { COLLECTION_UPDATED } from "$data/texts.js";

/**
 *
 * @param {string} id
 * @param {string} body
 * @param {string} token
 */
export async function collectionUpdate(id, body, token) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
            credentials: "omit",
        },
        body,
    };
    const result = await request(`${apiRoute}/${COLLECTION}/${id}`, options);
    if (result.ok) {
        const data = await result.json();
        const responseObj = getResponseObjWithData();
        responseObj.status = true;
        responseObj.success_message = COLLECTION_UPDATED;
        responseObj.data = data;
        return responseObj;
    } else {
        throw new SaveError();
    }
}

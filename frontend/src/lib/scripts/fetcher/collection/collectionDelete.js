import { request } from "$fetcher/fetcher.js";
import { apiRoute } from "$fetcher/apiRequests.js";
import { COLLECTION } from "$fetcher/apimap";
import { DeleteError } from "$errors/DeleteError.js";

/**
 * @param {number} id
 * @param {string} token
 */
export async function collectionDelete(id, token) {
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            credentials: "omit",
        },
    };

    const result = await request(`${apiRoute}/${COLLECTION}/${id}`, options);
    if (result.ok) {
        return true;
    } else {
        throw new DeleteError();
    }
}

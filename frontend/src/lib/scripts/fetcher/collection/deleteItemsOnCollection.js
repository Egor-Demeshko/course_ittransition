import { DeleteItemsError } from "$errors/DeleteItemsError";
import { apiRoute } from "$fetcher/apiRequests";
import { DELETE_ITEMS } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 * @param {number} collection_id
 * @param {string} body - item ids that should be remained, saved. if id is not present, it will be deleted
 * @param {string} token
 */
export async function deleteItemsOnCollection(collection_id, body, token) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
        body,
    };

    const route = `${apiRoute}/${DELETE_ITEMS}/${collection_id}`;
    const result = await request(route, options);

    if (result.ok) {
        return await result.json();
    } else {
        throw new DeleteItemsError();
    }
}

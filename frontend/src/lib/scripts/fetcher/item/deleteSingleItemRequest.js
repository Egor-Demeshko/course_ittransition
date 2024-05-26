import { DeleteItemsError } from "$errors/DeleteItemsError";
import { apiRoute } from "$fetcher/apiRequests";
import { ITEM } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {number} id
 * @param {string} token
 */
export async function deleteSingleItemRequest(id, token) {
    const route = `${apiRoute}/${ITEM}/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
    };

    const response = await request(route, options);
    if (response.ok) {
        return true;
    } else {
        throw new DeleteItemsError("single");
    }
}

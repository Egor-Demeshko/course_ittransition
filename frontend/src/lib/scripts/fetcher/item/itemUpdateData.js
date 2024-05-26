import { UpdateItemError } from "$errors/item/UpdateItemError";
import { apiRoute } from "$fetcher/apiRequests";
import { ITEM } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {number} id - Item id;
 * @param {string} body - json patch data already stringified
 * @param {string} token
 */
export async function itemUpdateData(id, body, token) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
        body,
    };
    const result = await request(`${apiRoute}/${ITEM}/${id}`, options);

    if (result.ok) {
        return await result.json();
    } else {
        throw new UpdateItemError();
    }
}

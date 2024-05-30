import { CollectionsGetError } from "$errors/CollectionsGetError";
import { apiRoute, SERVER_TYPE, protocol } from "$fetcher/apiRequests";
import { COLLECTION } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher.js";
import { COLLECTIONS_GET_ERROR } from "$data/texts";

/**
 *
 * @param {number} id
 */
export async function collectionSingle(id) {
    const route = `${protocol}//${SERVER_TYPE}/api/${COLLECTION}/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
        },
        credentials: "omit",
    };

    const result = await request(route, options);
    if (result.ok) {
        return await result.json();
    } else {
        throw new CollectionsGetError(COLLECTIONS_GET_ERROR);
    }
}

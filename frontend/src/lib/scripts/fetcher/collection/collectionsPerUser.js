import { request } from "$fetcher/fetcher.js";
import { USER, COLLECTIONS_PER_USER, errorsmap } from "$fetcher/apimap";
import { CollectionsGetError } from "$errors/CollectionsGetError.js";

/**
 * Receive collections thourgh server
 * @param {number} user_id
 */
export async function collectionsPerUser(user_id) {
    const options = {
        method: "GET",
        "Content-Type": "application/ld+json",
    };

    const result = await request(
        `http://server/api/${USER}/${user_id}/${COLLECTIONS_PER_USER}?page=1`,
        options
    );
    if (result.ok) {
        return await result.json();
    } else {
        throw new CollectionsGetError(errorsmap[USER][COLLECTIONS_PER_USER]);
    }
}

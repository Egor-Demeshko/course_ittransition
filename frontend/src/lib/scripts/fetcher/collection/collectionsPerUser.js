import { request } from "$fetcher/fetcher.js";
import { USER, COLLECTIONS_PER_USER, errorsmap } from "$fetcher/apimap";
import { CollectionsGetError } from "$errors/CollectionsGetError.js";
import {
    FRONT_TYPE,
    SERVER_TYPE,
    apiRoute,
    protocol,
} from "$fetcher/apiRequests";

const ROUTE_TYPES = {
    [FRONT_TYPE]: apiRoute,
    [SERVER_TYPE]: SERVER_TYPE + "/api",
};

/**
 * Receive collections thourgh server
 * @param {number} user_id
 * @param {number} page
 */
export async function collectionsPerUser(
    user_id,
    page = 1,
    requestType = ROUTE_TYPES[SERVER_TYPE]
) {
    const options = {
        method: "GET",
        "Content-Type": "application/ld+json",
    };
    const PROTOCOL = requestType === FRONT_TYPE ? "" : `${protocol}//`;
    const route = `${PROTOCOL}${ROUTE_TYPES[requestType]}/${USER}/${user_id}/${COLLECTIONS_PER_USER}?page=${page}`;

    try {
        const result = await request(route, options);
        if (result.ok) {
            return await result.json();
        } else {
            throw new CollectionsGetError(
                errorsmap[USER][COLLECTIONS_PER_USER]
            );
        }
    } catch (e) {
        console.log(e.message);
    }
}

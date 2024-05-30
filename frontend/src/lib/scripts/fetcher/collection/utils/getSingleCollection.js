import { apimap, COLLECTION, SINGLE } from "$fetcher/apimap";
import { singleCollectionToApp } from "$normolizers/singleCollectionToApp.js";

/**
 *
 * @param {number} id
 */
export async function getSingleCollection(id) {
    const collection = await apimap[COLLECTION][SINGLE](id);
    const normolizedResult = singleCollectionToApp(collection);

    return normolizedResult;
}

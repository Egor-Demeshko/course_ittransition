import { CollectionsGetError } from "$errors/CollectionsGetError.js";
import { getSingleCollection } from "$fetcher/collection/utils/getSingleCollection.js";
import { getResponseObjWithData } from "$utils/getResponseObj.js";
import { PARAMS_NOT_CORRECT_ERROR } from "$data/texts.js";

export async function load({ params }) {
    const collection_id = params?.collection_id;
    const responseObj = getResponseObjWithData();

    if (!collection_id) {
        responseObj.errors.push(PARAMS_NOT_CORRECT_ERROR);
    }

    try {
        /**@type {import('$types/types').SingleCollection} */
        const data = await getSingleCollection(Number.parseInt(collection_id));

        responseObj.status = true;
        responseObj.data = data;
    } catch (e) {
        if (e instanceof CollectionsGetError) {
            responseObj.errors.push(e.message);
            responseObj.status = false;
        }
        console.log(e);
    }
    return responseObj;
}

import {
    USER,
    apimap,
    COLLECTIONS_PER_USER,
} from "$lib/scripts/fetcher/apimap.js";
import { getResponseObjWithData } from "$utils/getResponseObj.js";
import { CollectionsGetError } from "$errors/CollectionsGetError.js";
import { additionalFieldToApp } from "$normolizers/additionalfieldToApp.js";

export async function load({ params, url }) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~REQUEST", url);
    const user_id = params?.user_id;
    const reponseObj = getResponseObjWithData();

    if (!user_id) return reponseObj;

    try {
        /**@type {{}[]} */
        const data = await getCollections(Number.parseInt(user_id));

        reponseObj.status = true;
        reponseObj.data = data;
    } catch (e) {
        if (e instanceof CollectionsGetError) {
            reponseObj.errors.push(e.message);
        }
        console.log(e);
    }
    return reponseObj;
}

/**
 * @param {number} user_id
 */
async function getCollections(user_id) {
    const result = await apimap[USER][COLLECTIONS_PER_USER](user_id);
    const normolizedResult = prepareAdditionalFields(result);
    return normolizedResult;
}

/**
 *
 * @param {Record<string, any>} dataFromServer
 */
function prepareAdditionalFields(dataFromServer) {
    const data = dataFromServer["hydra:member"];
    const newCollections = [];
    for (let collection of data) {
        const newAdditionalFields = [];
        if (
            collection.additionalFields &&
            collection.additionalFields.length > 0
        ) {
            for (let additionalField of collection.additionalFields) {
                const normolizedData = additionalFieldToApp(additionalField);
                newAdditionalFields.push(normolizedData);
            }
        }

        collection.additionalFields = newAdditionalFields;
        newCollections.push(collection);
    }
    dataFromServer["hydra:member"] = newCollections;
    return dataFromServer;
}

import {
    USER,
    apimap,
    COLLECTIONS_PER_USER,
} from "$lib/scripts/fetcher/apimap.js";
import { getResponseObjWithData } from "$utils/getResponseObj.js";
import { CollectionsGetError } from "$errors/CollectionsGetError.js";

export async function load({ params }) {
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

    return result;
}

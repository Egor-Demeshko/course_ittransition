import { getResponseObjWithData } from "$utils/getResponseObj.js";
import { CollectionsGetError } from "$errors/CollectionsGetError.js";
import { getCollections } from "$fetcher/collection/utils/getCollections.js";

export async function load({ params, url }) {
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

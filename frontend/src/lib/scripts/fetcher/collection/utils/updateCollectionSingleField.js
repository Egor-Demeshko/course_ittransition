import { GENERAL_ERROR } from "$data/texts";
import { UpdateError } from "$errors/UpdateError";
import { COLLECTION, UPDATE, apimap } from "$fetcher/apimap";
import { STORAGE_LOCAL, getDataFromStorage } from "$storage/storages";
import { isToken } from "$token/token";
import { getNewObj, getResponseObjWithData } from "$utils/getResponseObj";

/**
 * @param {number} id
 * @param {{[key:string]: any}} obj
 * @returns
 */
export async function updateCollectionSingleField(id, obj) {
    const response = getResponseObjWithData();
    try {
        if (!(await isToken())) return;

        const fromStorage = getDataFromStorage(STORAGE_LOCAL);
        if (fromStorage) {
            const token = JSON.parse(fromStorage)["token"];
            if (!token) return;

            const result = await apimap[COLLECTION][UPDATE](
                id,
                JSON.stringify(obj),
                token
            );
            response.status = true;
            response.data.push(result.data);
        }
    } catch (e) {
        response.status = false;
        if (e instanceof UpdateError) {
            response.errors.push({ field: null, message: e.message });
        } else {
            response.errors.push({ field: null, message: GENERAL_ERROR });
        }
    }

    return response;
}

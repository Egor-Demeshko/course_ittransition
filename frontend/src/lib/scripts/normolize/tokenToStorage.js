import { STORAGE_LOCAL } from "$lib/scripts/storages/storages";
import { getTokenPayload } from "$lib/scripts/utils/DTO/getTokenPayload";

/**
 * @type {import('$types/types').Normolizers}
 */
const normolisers = {
    [STORAGE_LOCAL]: local,
};

/**
 *
 * @param {string} storageId
 * @param {{}} payload
 * @returns
 */
export function normolizeTokenDataToStorage(storageId, payload) {
    return normolisers[storageId](payload);
}

/**
 * @param {import('$types/types').TokenPayload} payload
 * @return {import('$types/types').TokenPayload}
 * */
function local(payload) {
    const obj = getTokenPayload();
    obj.name =
        typeof payload.name === "string" ? payload.name : obj.name.toString();

    obj.user_id = +payload.user_id;

    obj.token =
        typeof payload.token === "string"
            ? payload.token
            : obj.token.toString();

    obj.exp = +payload.exp;
    return obj;
}

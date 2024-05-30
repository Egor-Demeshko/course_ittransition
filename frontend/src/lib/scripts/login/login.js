import { getNewObj } from "$lib/scripts/utils/getResponseObj.js";
import { setDataFromToken } from "$lib/scripts/token/token.js";

/**
 *
 * @param {{token: ?string}} obj
 */
export function createResponseOnToken(obj) {
    const responseObj = getNewObj();
    let token = "";

    try {
        if (obj?.token && setDataFromToken(obj.token)) {
            responseObj.status = true;
            responseObj.success_message = "Login successful";
        } else {
            responseObj.status = false;
            responseObj.success_message = "Login failed";
        }
    } catch (e) {
        {
            responseObj.status = false;
            responseObj.success_message = "Login failed";
        }
    }

    return responseObj;
}

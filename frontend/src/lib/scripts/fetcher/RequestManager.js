import { request } from "$lib/scripts/fetcher/apiRequests.js";
import { isToken, refresh } from "$lib/scripts/token/token.js";
import { TokenError } from "$lib/scripts/errors/TokenError.js";

/**
 *
 * @param {string} requestId
 * @param {{}} data
 * @returns
 */
export async function makePreperedApiReqeust(requestId, data) {
    if (await prepareToken()) {
        return await request[requestId](data);
    } else {
        throw new TokenError();
    }
}

async function prepareToken(isRefreshed = false) {
    if (await isToken()) {
        return true;
    }

    if (!isRefreshed) {
        await refresh();
        return prepareToken(true);
    }

    return false;
}

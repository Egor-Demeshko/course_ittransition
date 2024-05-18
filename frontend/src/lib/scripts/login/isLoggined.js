import { isToken, refresh } from "$lib/scripts/token/token.js";

/**
 * @returns {Promise<boolean>}
 */
export async function isLoggined() {
    if (await isToken()) {
        return true;
    }

    return false;
}

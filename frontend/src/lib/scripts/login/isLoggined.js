import { isToken, refresh } from "$lib/scripts/token/token.js";

/**
 * @returns {Promise<boolean>}
 */
export async function isLoggined(wasRefreshed = false) {
    if (isToken()) {
        return true;
    } else {
        if (!wasRefreshed) {
            await refresh();
            isLoggined(true);
        }
    }

    return false;
}

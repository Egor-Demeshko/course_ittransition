import { RefreshTokenError } from "$errors/RefreshTokenError";
import { STORAGE_LOCAL, getDataFromStorage } from "$storage/storages";
import { isToken } from "$token/token";

/**
 *
 * @returns {Promise<string|undefined>}
 * @throws {RefreshTokenError}
 */
export async function getTokenForRequest() {
    if (!(await isToken())) return;
    const dataFromStorage = getDataFromStorage(STORAGE_LOCAL);

    if (!dataFromStorage) throw new RefreshTokenError();
    const token = JSON.parse(dataFromStorage)["token"];
    if (!token) throw new RefreshTokenError();

    return token;
}

export const STORAGE_LOCAL = "local";
export const TOKEN_STORAGE_KEY = "course_token";

const storages = {
    local: globalThis?.localStorage,
};

/**
 *
 * @param {string} key - storage id
 * @param {any} value
 */
export function saveToStorage(key, value) {
    // @ts-ignore
    if (storages[key]) {
        switch (key) {
            case "local":
                storages[key].setItem(TOKEN_STORAGE_KEY, value);
                break;

            default:
                // @ts-ignore
                storages[key].setItem(TOKEN_STORAGE_KEY, value);
                break;
        }
    }
}

/**
 * @param {string} key - storage ID
 */
export function getDataFromStorage(key) {
    switch (key) {
        case STORAGE_LOCAL:
            return storages[STORAGE_LOCAL].getItem(TOKEN_STORAGE_KEY);
        default:
            return storages[STORAGE_LOCAL].getItem(TOKEN_STORAGE_KEY);
    }
}

/**
 * @param {string} storageId
 * @param {string} key
 */
export function clearStorageValueByKey(storageId, key) {
    switch (storageId) {
        case STORAGE_LOCAL:
            storages[STORAGE_LOCAL].removeItem(key);
            break;

        default:
            storages[STORAGE_LOCAL].removeItem(key);
            break;
    }
}

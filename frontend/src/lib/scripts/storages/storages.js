export const STORAGE_LOCAL = "local";
const KET_TO_STORAGE = "course_token";

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
                storages[key].setItem(KET_TO_STORAGE, value);
                break;

            default:
                // @ts-ignore
                storages[key].setItem(KET_TO_STORAGE, value);
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
            return storages[STORAGE_LOCAL].getItem(KET_TO_STORAGE);
        default:
            return storages[STORAGE_LOCAL].getItem(KET_TO_STORAGE);
    }
}

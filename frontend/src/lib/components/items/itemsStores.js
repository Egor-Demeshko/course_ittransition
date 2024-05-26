import { writable } from "svelte/store";

/** @type {import("svelte/store").Writable<{[key: number]: import('$types/types').Item}>} */
export const itemsStore = writable({});

/**
 *
 * @returns {{[key: number]: import('$types/types').Item}}
 */
export function getItemsStoreObj() {
    return {};
}

/**
 * @param {Array<number>} ids - Item ids to preserve
 */
export function clearSelectedItemsStore(ids) {
    itemsStore.update((currentItems) => {
        ids.forEach((id) => {
            delete currentItems[id];
        });
        return currentItems;
    });
}

/**
 * Deletes single item from store by id
 * @param {number} id
 */
export function deleteSingleItemFromStore(id) {
    itemsStore.update((currentItems) => {
        delete currentItems[id];
        return currentItems;
    });
}

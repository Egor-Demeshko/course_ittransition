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

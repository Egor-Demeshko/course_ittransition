import { writable } from "svelte/store";
import { CATEGORIES } from "$lib/data/texts.js";
import { collectionToApp } from "$normolizers/CollectionToApp";

/** @type {import("svelte/store").Writable<Record<string, (import('$types/types').Collection)>>} */
export const collectionsStore = writable({});

/**
 * @param {Record<string, (import('$types/types').Collection)>} previousCollectionMap
 * @param {Record<string, any>} collections
 */
export function updateCollectionStore(previousCollectionMap, collections) {
    if (!collections) return previousCollectionMap;
    /**@type {Record<string, (import('$types/types').Collection)>}*/
    const newCollectionMap = {};

    collections.forEach((collectionRaw) => {
        if (collectionRaw) {
            const collect = collectionToApp(collectionRaw);
            newCollectionMap[collect.id] = collect;
        }
    });

    return { ...newCollectionMap };
}

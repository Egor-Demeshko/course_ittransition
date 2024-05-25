import { writable } from "svelte/store";

/** @type {import("svelte/store").Writable<import('$types/types').selectedItemsStore>} */
export const checkboxes = writable({});

/** @param {Array<any>} ids */
export function initialSetup(ids) {
    checkboxes.update((checkboxes) => {
        ids.forEach((id) => {
            checkboxes[id] = { id, selected: false };
        });
        return checkboxes;
    });
}

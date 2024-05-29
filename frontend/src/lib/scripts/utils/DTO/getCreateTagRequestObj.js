import { ITEM } from "$fetcher/apimap";

/**
 *
 * @param {number} id
 * @param {string} inputValue
 * @returns {import('$types/types').tagCreate|undefined}
 */
export function getCreateTagRequestObj(id, inputValue) {
    if (!inputValue || !id) return;

    const item = `api/${ITEM}/${id}`;
    return {
        tag: {
            value: inputValue,
        },
        item,
    };
}

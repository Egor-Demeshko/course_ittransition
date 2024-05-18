import { collectionCreate } from "$lib/scripts/fetcher/collection/collectionCreate.js";

/**API **/
export const COLLECTION = "collection";
export const CREATE = "create";

/**
 * @type {import('$types/types').RequestMap}
 */
const obj = {};
/**
 * @type {import('$types/types').RequestErrors}
 */
const errors = {};

/**APIMAP */
obj[COLLECTION][CREATE] = collectionCreate;

/**ERRORS MAP */
errors[COLLECTION][CREATE] = "Failed to create collection";

export const apimap = obj;
export const errorsmap = errors;

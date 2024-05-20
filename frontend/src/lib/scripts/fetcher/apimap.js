import { collectionCreate } from "$lib/scripts/fetcher/collection/collectionCreate.js";

/**API **/
export const COLLECTION = "collections";
export const CREATE = "create";
export const CATHEGORY = "categories";
export const USER = "users";

/**
 * @type {import('$types/types').RequestMap}
 */
const obj = {};
/**
 * @type {import('$types/types').RequestErrors}
 */
const errors = {};

/**APIMAP */
obj[COLLECTION] = {};
obj[COLLECTION][CREATE] = collectionCreate;

/**ERRORS MAP */
errors[COLLECTION] = {};
errors[COLLECTION][CREATE] = "Failed to create collection";

errors[CATHEGORY] = { default: "Failed to get cathegory" };

export const apimap = obj;
export const errorsmap = errors;

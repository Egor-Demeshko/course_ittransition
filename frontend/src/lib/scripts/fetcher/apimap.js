import { collectionCreate } from "$lib/scripts/fetcher/collection/collectionCreate.js";
import { collectionsPerUser } from "$fetcher/collection/collectionsPerUser.js";

/**API **/
/**@type {string} */
export const COLLECTION = "collections";
export const CREATE = "create";
export const CATHEGORY = "categories";
export const USER = "users";
export const COLLECTIONS_PER_USER = "collections";
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

obj[USER] = {};
obj[USER][COLLECTIONS_PER_USER] = collectionsPerUser;

/**ERRORS MAP */
errors[COLLECTION] = {};
errors[COLLECTION][CREATE] = "Failed to create collection";

errors[USER] = {};
errors[USER][COLLECTIONS_PER_USER] = "Failed to get collections";

errors[CATHEGORY] = { default: "Failed to get cathegory" };

export const apimap = obj;
export const errorsmap = errors;

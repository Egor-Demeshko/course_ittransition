/**
 * @typedef Collection
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {?string} image
 * @property {string} category
 * @property {?string} modifed_at
 * @property {Array<{label: string, type: string}>} fields - dynamic fields of collection, can be added bu user
 */
export const Collection = "Collection";

/**
 * @typedef Collections
 * @type {{[key: number]: Collection}}
 */
export const Collections = "Collections";

/**
 * @typedef Field
 * @property {string} label
 * @property {string} type
 */
export const Field = "Field";

/**
 * @typedef RequestMap
 * @type {{[key: string]: {[key: string]: Function}}}
 * @description store all methods to api request
 */
export const RequestMap = "RequestMap";

/**
 * @typedef RequestErrors
 * @type {{[key: string]: {[key: string]: string}}}
 */
export const RequestErrors = "RequestErrors";

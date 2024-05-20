/**
 * @typedef Collection
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {?string} image
 * @property {string} category
 * @property {?string} modifed_at
 * @property {Array<{label: string, type: string}>} fields - dynamic fields of collection, can be added bu user
 */
export const Collection = "Collection";

/**
 * @typedef CollectionDTO
 * @property {string} title
 * @property {string} description
 * @property {string} cathegory
 * @property {?string} user
 */
export const CollectionDTO = "CollectionDTO";

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

/**
 * @typedef Normolizers
 * @type {{[key: string]: Function}}
 */
export const Normolizers = "Normolizers";

/**
 * Token refresh/login payload
 * @typedef {Object} TokenPayload
 * @property {number} user_id
 * @property {number} exp
 * @property {string} name
 * @property {string} token
 */
export const TokenPayload = "TokenPayload";

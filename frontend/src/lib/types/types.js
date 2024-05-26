/**
 * @typedef Collection
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {?string} image_link
 * @property {string} category
 * @property {?string} modified_at
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

/**
 * Predifined reponse object with payload under data property
 * @typedef ResponseObjWithData
 * @property {boolean} status
 * @property {string} success_message
 * @property {Object[]} errors
 * @property {{[key: string]: any}} data
 */
export const ResponseObjWithData = "ResponseObjWithData";

/**
 * Object that contains data for additional field in a collection
 * @typedef AdditionalFieldLink
 * @property {number} id
 * @property {number} field_data_id
 * @property {string} type
 * @property {string} label
 *
 */
export const AdditionalFieldLink = "AdditionalFieldLink";

/**
 * @typedef AdditionalFieldComposed
 * @property {string} label
 * @property {string} type
 * @property {string} content
 */
export const AdditionalFieldComposed = "AdditionalFieldComposed";

/**
 * @typedef Item
 * @property {number} id
 * @property {string} name
 * @property {Array< TagsLink >} tags
 * @property {string} modified_at
 * @property {Array<AdditionalFieldComposed>} additional_fields
 *
 */
export const Item = "Item";

/**
 * @typedef ItemsList
 * @type {{[key: number]: Item}}
 */
export const ItemsList = "ItemsList";

/**
 * @typedef SingleCollection
 * @property {number} id
 * @property {string} title
 * @property {string} image_link
 * @property {string} modified_at
 * @property {Array<string>} additionalFields
 * @property {ItemsList} items
 */
export const SingleCollection = "SingleCollection";

/**
 * @typedef ItemSelected
 * @property {number} id
 * @property {boolean} selected
 */
export const ItemSelected = "ItemSelected";

/**
 * @typedef selectedItemsStore
 * @type {{[key: number]: ItemSelected}}
 */
export const selectedItemsStore = "selectedItemsStore";

/**
 * @typedef Tag
 * @property {string} value
 * @property {number} id
 */
export const Tag = "Tag";

/**
 * @typedef TagsLink
 * @property {number} id
 * @property {string} tag_content
 */
export const TagsLink = "TagsLink";

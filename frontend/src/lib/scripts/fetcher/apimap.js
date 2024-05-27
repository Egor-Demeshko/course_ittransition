import { collectionCreate } from "$lib/scripts/fetcher/collection/collectionCreate.js";
import { collectionsPerUser } from "$fetcher/collection/collectionsPerUser.js";
import { collectionUpdate } from "$fetcher/collection/collectionUpdate.js";
import { collectionDelete } from "$fetcher/collection/collectionDelete.js";
import { additionalFieldCreate } from "$fetcher/additionalField/additionalFieldCreate.js";
import { additionalFieldDelete } from "$fetcher/additionalField/additionalFieldDelete.js";
import { additionalFieldUpdate } from "$fetcher/additionalField/additionalFieldUpdate.js";
import { collectionSingle } from "$fetcher/collection/collectionSingle.js";
import { itemCreate } from "$fetcher/item/itemCreate.js";
import { deleteItemsOnCollection } from "./collection/deleteItemsOnCollection";
import { deleteSingleItemRequest } from "./item/deleteSingleItemRequest";
import { itemUpdateData } from "./item/itemUpdateData";
import { getSingleItem } from "./item/getSingleItem";
import { tagCreateRequest } from "./tag/tagCreateRequest";
import { tagDeleteRequest } from "./tag/tagDeleteRequest";

/**API **/
/**@type {string} */
export const COLLECTION = "collections";
export const CREATE = "create";
export const CATHEGORY = "categories";
export const ADDITIONAL_FIELD = "additional_fields";
export const USER = "users";
export const COLLECTIONS_PER_USER = "collections";
export const UPDATE = "update";
export const DELETE = "delete";
export const SINGLE = "single";
export const ITEM = "items";
export const DELETE_ITEMS = "delete_items_on_collections";
export const TAGLINK = "taglinks";

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
obj[COLLECTION][UPDATE] = collectionUpdate;
obj[COLLECTION][DELETE] = collectionDelete;
obj[COLLECTION][SINGLE] = collectionSingle;
obj[COLLECTION][DELETE_ITEMS] = deleteItemsOnCollection;

/** additional fields */
obj[ADDITIONAL_FIELD] = {};
obj[ADDITIONAL_FIELD][CREATE] = additionalFieldCreate;
obj[ADDITIONAL_FIELD][DELETE] = additionalFieldDelete;
obj[ADDITIONAL_FIELD][UPDATE] = additionalFieldUpdate;

obj[USER] = {};
obj[USER][COLLECTIONS_PER_USER] = collectionsPerUser;

obj[ITEM] = {};
obj[ITEM][CREATE] = itemCreate;
obj[ITEM][DELETE] = deleteSingleItemRequest;
obj[ITEM][UPDATE] = itemUpdateData;
obj[ITEM][SINGLE] = getSingleItem;

obj[TAGLINK] = {};
obj[TAGLINK][CREATE] = tagCreateRequest;
obj[TAGLINK][DELETE] = tagDeleteRequest;

/**ERRORS MAP */
errors[COLLECTION] = {};
errors[COLLECTION][CREATE] = "Failed to create collection";
errors[COLLECTION][UPDATE] = "Failed to update collection";
errors[COLLECTION][DELETE_ITEMS] = "Failed to delete group of items";

errors[USER] = {};
errors[USER][COLLECTIONS_PER_USER] = "Failed to get collections";

errors[CATHEGORY] = { default: "Failed to get cathegory" };

errors[ITEM] = {};
errors[ITEM][CREATE] = "Failed to create item";
errors[ITEM][DELETE] = "Failed to delete item";
errors[ITEM][UPDATE] = "Failed to update item's data";
errors[ITEM][SINGLE] = "Failed to get item data";

errors[TAGLINK] = {};
errors[TAGLINK][CREATE] = "Failed to create a tag";
errors[TAGLINK][DELETE] = "Failed to delete a tag";

export const apimap = obj;
export const errorsmap = errors;

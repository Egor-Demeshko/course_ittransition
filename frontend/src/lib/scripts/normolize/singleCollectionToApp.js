import { getSingleCollectionObj } from "$utils/DTO/getCollectionObj";
import { additionalContentToApp } from "./additionalContentToApp";

/** @param {Record<string, any>} data */
export function singleCollectionToApp(data) {
    const singleCollectionObject = getSingleCollectionObj();

    for (let [key, value] of Object.entries(data)) {
        switch (key) {
            case "id":
                singleCollectionObject.id = Number.parseInt(value);
                break;
            case "title":
                singleCollectionObject.title = value.toString();
                break;
            case "image_link":
                singleCollectionObject.image_link = value.toString();
                break;
            case "modified_at":
                singleCollectionObject.modified_at = value.toString();
                break;
            case "additionalFields":
                singleCollectionObject.additionalFields = value;
                break;
            case "items":
                singleCollectionObject.items = parseItems(value);
                break;
            case "user":
                singleCollectionObject.user_id = value.id;
                break;
        }
    }

    return singleCollectionObject;
}

/**
 *
 * @return {Array<import('$types/types').Item>} items
 */
function parseItems(items) {
    items.forEach((item) => {
        if (item.additionalFieldContents) {
            item.additionalFieldContents = parseContents(
                item.additionalFieldContents
            );
        }
    });

    return items;
}

/** @param {[{}]} value*/
function parseContents(value) {
    /** @type {Array<import('$types/types').AdditionalContent>} */
    const result = [];
    value.forEach((content) => {
        let value = additionalContentToApp(content);

        if (value) {
            result.push(value);
        }
    });
    return result;
}

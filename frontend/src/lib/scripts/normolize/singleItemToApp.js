import { getItemObject } from "$utils/DTO/getItemObject";
import { getTagLinkObj } from "$utils/DTO/getTagLinkObj";
import { additionalContentToApp } from "./additionalContentToApp";

/**
 *
 * @param {{}} data
 */
export function singleItemToApp(data) {
    const item = getItemObject();
    for (let [key, value] of Object.entries(data)) {
        switch (key) {
            case "id":
                item.id = Number.parseInt(value);
                break;
            case "name":
                item.name = value.toString();
                break;
            case "tagLinks":
                item.tags = processtagLink(value);
                break;
            case "modified_at":
                item.modified_at = value.toString();
                break;
            case "additional_fields":
                item.additional_fields = value;
                break;
            case "collection":
                item.collection_id = value?.id || null;
                break;
            case "fieldData":
                item.fieldMetaData = value;
                break;
            case "additionalFieldContents":
                item.additional_content = processAdditionalContent(value);
                break;
        }
    }

    return item;
}

/**
 *
 * @param {[]} tagLinks
 * @returns {{[key: number]: import('$types/types').TagsLink}}
 */
function processtagLink(tagLinks) {
    /** @type {{[key: number]: import('$types/types').TagsLink}} */
    const tagsArr = {};
    for (let link of tagLinks) {
        const obj = getTagLinkObj();
        // @ts-ignore
        if (link.id) {
            // @ts-ignore
            obj.id = Number.parseInt(link.id);
        }

        if (link?.tag) {
            obj.tag = { id: null, value: link.tag?.value ?? "" };
        }

        tagsArr[obj.id] = obj;
    }

    return tagsArr;
}

/**
 *
 * @param {[{}]} value
 */
function processAdditionalContent(additionalContents) {
    const result = [];
    additionalContents.forEach((content) => {
        let value = additionalContentToApp(content);
        if (value) {
            result.push(value);
        }
    });
    return result;
}

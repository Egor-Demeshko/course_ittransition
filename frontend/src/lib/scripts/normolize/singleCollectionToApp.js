import { getSingleCollectionObj } from "$utils/DTO/getCollectionObj";

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
        }
    }

    return singleCollectionObject;
}

function parseItems(value) {
    const arr = [];

    for (let item of value) {
        const newTags = [];
        for (let tagLink of item.tagLinks) {
            if (tagLink.tag && tagLink.tag.value) {
                newTags.push(tagLink.tag.value);
            }
        }
    }
}

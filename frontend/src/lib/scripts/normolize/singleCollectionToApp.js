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
                singleCollectionObject.items = value;
                break;
        }
    }

    return singleCollectionObject;
}

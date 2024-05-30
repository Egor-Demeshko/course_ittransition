import { getFullCollectionObj } from "../utils/DTO/getCollectionObj";
import { CATEGORIES } from "$data/texts.js";

/**
 *
 * @param {Record<string, any>} dataFromServer
 * @return {import('$types/types').Collection}
 */
export function collectionToApp(dataFromServer) {
    const normolizedObj = getFullCollectionObj();

    for (let [key, value] of Object.entries(dataFromServer)) {
        switch (key) {
            case "id":
                normolizedObj.id = Number.parseInt(value);
                break;
            case "title":
                normolizedObj.title = value.toString();
                break;
            case "description":
                normolizedObj.description = value.toString();
                break;
            case "image_link":
                normolizedObj.image_link = value.toString();
                break;
            case "cathegory_id":
                normolizedObj.category = CATEGORIES[Number.parseInt(value) - 1];
                break;
            case "modified_at":
                normolizedObj.modified_at = value.toString();
                break;
            case "additionalFields":
                normolizedObj.fields = value;
                break;
        }
    }

    return normolizedObj;
}

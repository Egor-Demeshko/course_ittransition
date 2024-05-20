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
            case "@id":
                normolizedObj.id = value.toString();
                break;
            case "title":
                normolizedObj.title = value.toString();
                break;
            case "description":
                normolizedObj.description = value.toString();
                break;
            case "image":
                normolizedObj.image = value.toString();
                break;
            case "category":
                normolizedObj.category = CATEGORIES[value + 1];
                break;
            case "modifed_at":
                normolizedObj.modifed_at = value.toString();
                break;
            case "fields":
                normolizedObj.fields = value;
                break;
        }
    }

    return normolizedObj;
}

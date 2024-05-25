import { getItemObject } from "$utils/DTO/getItemObject";

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
            case "tags":
                item.tags = value;
                break;
            case "modified_at":
                item.modified_at = value.toString();
                break;
            case "additional_fields":
                item.additional_fields = value;
                break;
        }
    }

    return item;
}

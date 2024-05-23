import { getAdditionalFieldObj } from "$utils/DTO/getAdditionalFieldObj";

/**
 *
 * @param {Record<string, any>} dataFromServer
 * @return {import('$types/types').AdditionalFieldLink}
 * @throws {NormalizationError}
 */
export function additionalFieldToApp(dataFromServer) {
    const normolizedObj = getAdditionalFieldObj();

    for (let [key, value] of Object.entries(dataFromServer)) {
        switch (key) {
            case "id":
                normolizedObj.id = Number.parseInt(value);
                break;
            case "field_data":
                proccesInner(value, normolizedObj);
                break;
        }
    }

    return normolizedObj;
}

/**
 * @param {Record<string, any>} field_data
 * @param {import('$types/types').AdditionalFieldLink} normolizedObj
 */
function proccesInner(field_data, normolizedObj) {
    for (let [key, value] of Object.entries(field_data)) {
        switch (key) {
            case "id":
                normolizedObj.field_data_id = Number.parseInt(value);
                break;
            case "type":
                normolizedObj.type = value.toString();
                break;
            case "label":
                normolizedObj.label = value.toString();
                break;
        }
    }
}

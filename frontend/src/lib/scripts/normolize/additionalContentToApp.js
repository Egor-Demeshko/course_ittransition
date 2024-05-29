import { getAdditionalContentObj } from "$utils/DTO/getAdditionalContentObj";

/**
 *
 * @param {{}} data
 * @return {import('$types/types').AdditionalContent}
 */
export function additionalContentToApp(data) {
    const resultObj = getAdditionalContentObj();

    for (let [key, value] of Object.entries(data)) {
        switch (key) {
            case "id":
                resultObj.id = Number.parseInt(value);
                break;
            case "content":
                resultObj.content = value.toString();
                break;
            case "additional_data":
                populateResult(resultObj, value);
                break;
        }
    }

    return resultObj;
}

/**
 * @param {import('$types/types').AdditionalContent} resultObj
 * @param {{}} data
 */
function populateResult(resultObj, data) {
    for (let [key, value] of Object.entries(data)) {
        switch (key) {
            case "type":
                resultObj.type = value.toString();
                break;
            case "label":
                resultObj.label = value.toString();
                break;
        }
    }
}

import { additionalFieldToApp } from "$normolizers/additionalfieldToApp.js";

/**
 *
 * @param {Record<string, any>} dataFromServer
 */
export function prepareAdditionalFields(dataFromServer) {
    const data = dataFromServer["hydra:member"];
    const newCollections = [];
    for (let collection of data) {
        const newAdditionalFields = [];
        if (
            collection.additionalFields &&
            collection.additionalFields.length > 0
        ) {
            for (let additionalField of collection.additionalFields) {
                const normolizedData = additionalFieldToApp(additionalField);
                newAdditionalFields.push(normolizedData);
            }
        }

        collection.additionalFields = newAdditionalFields;
        newCollections.push(collection);
    }
    dataFromServer["hydra:member"] = newCollections;
    return dataFromServer;
}

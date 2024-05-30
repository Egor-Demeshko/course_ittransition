import {
    apimap,
    errorsmap,
    COLLECTION,
    CREATE,
    CATHEGORY,
} from "$lib/scripts/fetcher/apimap.js";
import {
    addNotification,
    errorNotificationType,
} from "$lib/components/notification/notification.js";
import { collectionsStore } from "$lib/scripts/collections/collectionsStore.js";
import {
    getDataFromStorage,
    STORAGE_LOCAL,
} from "$lib/scripts/storages/storages";
import { getCollectionObj } from "$lib/scripts/utils/DTO/getCollectionObj";
import { USER } from "$lib/scripts/fetcher/apimap.js";
import { collectionToApp } from "$lib/scripts/normolize/CollectionToApp.js";
import { DEFAULT_TITLE } from "$data/texts";

export async function addCollection() {
    const data = getDataFromStorage(STORAGE_LOCAL);
    if (!data) return;
    const { token, user_id } = JSON.parse(data);
    const bodyObj = getCollectionObj();
    bodyObj.user = `/api/${USER}/${user_id}`;

    setDefaults(bodyObj);
    const body = JSON.stringify(bodyObj);
    try {
        /**@type {import('$types/types').Collection}*/
        const result = await apimap[COLLECTION][CREATE](body, token);
        if (result) {
            const collection = collectionToApp(result);
            collectionsStore.update((collections) => {
                return { [collection.id]: collection, ...collections };
            });
        }
    } catch (e) {
        console.error("Error on api request.");
        addNotification(errorNotificationType, errorsmap[COLLECTION][CREATE]);
    }
}

// @ts-ignore
function setDefaults(bodyObj) {
    bodyObj.title = DEFAULT_TITLE;
    bodyObj.description = DEFAULT_TITLE;
    bodyObj.cathegory = `/api/${CATHEGORY}/1`;
}

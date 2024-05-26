import { checkboxes } from "$components/Controlls/stores/checkboxesStore";
import { itemsStore } from "$components/items/itemsStores";
import { DEFAULT_TITLE, GENERAL_ERROR } from "$data/texts";
import { RefreshTokenError } from "$errors/RefreshTokenError";
import { handleFrontError } from "$errors/functions/handleFrontError";
import { ItemCreateError } from "$errors/item/ItemCreateError";
import { apimap, ITEM, CREATE } from "$fetcher/apimap";
import { singleItemToApp } from "$normolizers/singleItemToApp";
import {
    addNotification,
    errorNotificationType,
} from "$notification/notification";
import { STORAGE_LOCAL, getDataFromStorage } from "$storage/storages";
import { getItemSelectedObj } from "$utils/DTO/getItemSelectedObj";

/**
 * @param {number} collection_id
 */
export async function addItem(collection_id) {
    const data = JSON.parse(getDataFromStorage(STORAGE_LOCAL) || "");
    const token = data?.token ?? null;

    if (!token) {
        addNotification(errorNotificationType, GENERAL_ERROR);
        return;
    }

    try {
        const response = await apimap[ITEM][CREATE](
            JSON.stringify({
                name: DEFAULT_TITLE,
                collection: `/api/collections/${collection_id}`,
            }),
            token
        );

        if (response) {
            const item = singleItemToApp(response);
            if (!item.id) return;
            itemsStore.update((currentItems) => {
                // @ts-ignore
                return { [item.id]: item, ...currentItems };
            });
            checkboxes.update((checkboxes) => {
                const checkbox = getItemSelectedObj();
                checkbox.id = item.id;
                return { ...checkboxes, [item.id]: checkbox };
            });
        }
    } catch (e) {
        handleFrontError(e, {
            [RefreshTokenError.name]: RefreshTokenError,
            [ItemCreateError.name]: ItemCreateError,
        });
    }
}

import { ITEM, SINGLE, apimap } from "$fetcher/apimap";
import { singleItemToApp } from "$normolizers/singleItemToApp";

/** @param {number} item_id */
export async function getItemsData(item_id) {
    const itemData = await apimap[ITEM][SINGLE](item_id);

    const item = singleItemToApp(itemData);
    console.log(item);
    return item;
}

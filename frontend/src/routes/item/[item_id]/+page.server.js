import { PARAMS_NOT_CORRECT_ERROR } from "$data/texts.js";
import { ItemGetError } from "$errors/item/ItemGetError.js";
import { getItemsData } from "$items/getItemData.js";
import { getResponseObjWithData } from "$utils/getResponseObj.js";

export async function load({ params }) {
    const item_id = params?.item_id;
    const responseObj = getResponseObjWithData();

    if (!item_id) {
        responseObj.errors.push(PARAMS_NOT_CORRECT_ERROR);
        responseObj.status = false;
        return responseObj;
    }

    try {
        let result = await getItemsData(+item_id);

        responseObj.status = true;
        responseObj.data = result;
    } catch (e) {
        if (e instanceof ItemGetError) {
            responseObj.errors.push(e.message);
            responseObj.status = false;
        }
    }
    return responseObj;
}

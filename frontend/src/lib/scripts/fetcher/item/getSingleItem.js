import { ItemGetError } from "$errors/item/ItemGetError";
import { SERVER_TYPE, protocol } from "$fetcher/apiRequests";
import { ITEM } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {number} user_id
 */
export async function getSingleItem(user_id) {
    const route = `${protocol}//${SERVER_TYPE}/api/${ITEM}/${user_id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
        },
    };

    const response = await request(route, options);

    if (response.ok) {
        return await response.json();
    } else {
        console.log(response);
        throw new ItemGetError();
    }
}

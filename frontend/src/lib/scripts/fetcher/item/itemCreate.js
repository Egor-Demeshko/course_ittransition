import { ItemCreateError } from "$errors/item/ItemCreateError";
import { apiRoute } from "$fetcher/apiRequests";
import { ITEM } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 * @param {string} body
 * @param {string} token
 */
export async function itemCreate(body, token) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
            Athorization: `Bearer ${token}`,
            credentials: "omit",
        },
        body,
    };

    const result = await request(`${apiRoute}/${ITEM}`, options);

    if (result.ok) {
        return await result.json();
    } else {
        throw new ItemCreateError();
    }
}

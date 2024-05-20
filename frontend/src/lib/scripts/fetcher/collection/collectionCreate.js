import { apiRoute } from "$lib/scripts/fetcher/apiRequests";
import { request } from "$lib/scripts/fetcher/fetcher.js";
import { COLLECTION, CREATE } from "$lib/scripts/fetcher/apimap.js";

/**
 *
 * @param {string} body
 * @param {string} token
 * @returns {Promise<import('$types/types').Collection|{}>}
 */
export async function collectionCreate(body, token) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
            credentials: "omit",
        },
        body,
    };
    const result = await request(`${apiRoute}/${COLLECTION}`, options);

    if (result.ok) {
        return await result.json();
    } else {
        return {};
    }
}

import { apiRoute } from "$fetcher/apiRequests";
import { ADDITIONAL_FIELD } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher.js";
import { UpdateError } from "$errors/UpdateError.js";

/**
 *
 * @param {number} id
 * @param {string} token
 * @param {Record<string, any>} payload
 */
export async function additionalFieldUpdate(id, token, payload) {
    const route = `${apiRoute}/${ADDITIONAL_FIELD}/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
        },
        body: payload,
        credentials: "omit",
    };

    const result = await request(route, options);

    if (result.ok) {
        return await result.json();
    } else {
        throw new UpdateError();
    }
}

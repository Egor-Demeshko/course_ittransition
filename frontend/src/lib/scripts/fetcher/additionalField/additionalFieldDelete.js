import { ADDITIONAL_FIELD } from "$fetcher/apimap.js";
import { apiRoute } from "$fetcher/apiRequests.js";
import { request } from "$fetcher/fetcher.js";
import { DeleteError } from "$errors/DeleteError.js";

/**
 * @param {number} id
 * @param {string} token
 */
export async function additionalFieldDelete(id, token) {
    const route = `${apiRoute}/${ADDITIONAL_FIELD}/${id}`;
    const options = {
        method: "DELETE",
        credentials: "omit",
    };

    const result = await request(route, options);

    if (result.ok) {
        return true;
    } else {
        throw new DeleteError();
    }
}

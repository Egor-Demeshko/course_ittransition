import { TagDeleteError } from "$errors/tag/TagDeleteError";
import { apiRoute } from "$fetcher/apiRequests";
import { TAGLINK } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {number} id
 * @param {string} token
 */
export async function tagDeleteRequest(id, token) {
    const route = `${apiRoute}/${TAGLINK}/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
    };

    const response = await request(route, options);
    if (response.ok) {
        return true;
    } else {
        throw new TagDeleteError();
    }
}

import { TAG } from "$data/texts";
import { TagCreateError } from "$errors/tag/TagCreateError";
import { apiRoute } from "$fetcher/apiRequests";
import { CREATE, TAGLINK } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {string} body
 * @param {string} token
 */
export async function tagCreateRequest(body, token) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
        body,
    };

    const route = `${apiRoute}/${TAGLINK}/${CREATE}`;

    const result = await request(route, options);
    if (result.ok) {
        return await result.json();
    } else {
        throw new TagCreateError();
    }
}

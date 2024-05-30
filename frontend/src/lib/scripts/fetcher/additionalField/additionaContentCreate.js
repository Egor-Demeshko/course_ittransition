import { AdditionalContentCreateError } from "$errors/additionalField/AdditionalContentCreate";
import { apiRoute } from "$fetcher/apiRequests";
import { ADDITIONAL_CONTENT } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

/**
 *
 * @param {string} body
 * @param {string} token
 */
export async function additionaContentCreate(body, token) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
        body,
    };
    const route = `${apiRoute}/${ADDITIONAL_CONTENT}`;

    const result = await request(route, options);

    if (result.ok) {
        return await result.json();
    } else {
        throw new AdditionalContentCreateError();
    }
}

import { COLLECTION } from "$fetcher/apimap.js";
import { ADDITIONAL_FIELD_LABEL } from "$lib/data/texts.js";
import { request } from "$fetcher/fetcher.js";
import { apiRoute } from "$fetcher/apiRequests.js";
import { ADDITIONAL_FIELD } from "$fetcher/apimap.js";
import { AdditionalFieldError } from "$errors/AdditionalFieldError.js";

/**
 * @param {number} id - collection id
 * @param {string} token - user token
 */
export async function additionalFieldCreate(id, token) {
    const predefinedData = {
        collection: `/api/${COLLECTION}/${id}`,
        field_data: {
            type: "Number",
            label: ADDITIONAL_FIELD_LABEL,
        },
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "omit",
        body: JSON.stringify(predefinedData),
    };

    const route = `${apiRoute}/${ADDITIONAL_FIELD}`;

    const result = await request(route, options);
    if (result.ok) {
        return await result.json();
    } else {
        throw new AdditionalFieldError();
    }
}

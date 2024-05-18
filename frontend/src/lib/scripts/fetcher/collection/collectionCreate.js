import { apiRoute } from "$lib/scripts/fetcher/apiRequests";
import { request } from "$lib/scripts/fetcher/fetcher.js";
import { COLLECTION, CREATE } from "$lib/scripts/fetcher/apimap.js";

export async function collectionCreate() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const result = await request(
        `${apiRoute}/${COLLECTION}/${CREATE}`,
        options
    );

    if (result.ok) {
        return await result.json();
    } else {
        return {};
    }
}

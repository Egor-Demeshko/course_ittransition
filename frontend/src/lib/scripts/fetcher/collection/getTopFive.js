import { CollectionsGetError } from "$errors/CollectionsGetError";
import { SERVER_TYPE, protocol } from "$fetcher/apiRequests";
import { TOP_FIVE } from "$fetcher/apimap";
import { request } from "$fetcher/fetcher";

export async function getTopFive() {
    const route = `${protocol}//${SERVER_TYPE}/api/${TOP_FIVE}`;

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
        throw new CollectionsGetError();
    }
}

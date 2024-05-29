import { CollectionsGetError } from "$errors/CollectionsGetError";
import { GET, TOP_FIVE, apimap } from "$fetcher/apimap";
import { topFiveToApp } from "$normolizers/topFiveToApp";
import { getResponseObjWithData } from "$utils/getResponseObj";

export async function load() {
    const responseObj = getResponseObjWithData();
    try {
        let response = await apimap[TOP_FIVE][GET]();

        if (response) {
            let data = topFiveToApp(response);

            responseObj.status = true;
            responseObj.data = data;
        }
    } catch (e) {
        if (e instanceof CollectionsGetError) {
            responseObj.errors.push(e.message);
        }
    }

    return responseObj;
}

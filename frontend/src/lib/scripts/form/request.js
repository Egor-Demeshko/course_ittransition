import { request as apiRequests } from "$lib/scripts/fetcher/apiRequests";

/**
 *
 * @param {string} formId
 * @param {FormData} formData
 */
export async function request(formId, formData) {
    return await apiRequests[formId](formData);
}

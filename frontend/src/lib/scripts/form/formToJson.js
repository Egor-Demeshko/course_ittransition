/**
 *
 * @param {FormData} data
 */
export function formToJson(data) {
    /**
     * @type {Record<string, any>}
     */
    let obj = {};

    for (let key of data.keys()) {
        obj[key] = data.get(key);
    }

    return JSON.stringify(obj);
}

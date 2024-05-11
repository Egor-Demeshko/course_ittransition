/**
 * @param {string} route
 * @param {{}} options
 * @returns
 */
export async function request(route, options) {
    return fetch(route, options);
}

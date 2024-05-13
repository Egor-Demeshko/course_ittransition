import { REGISTER, LOGIN, LOGIN_END } from "$lib/data/consts.js";
import { PUBLIC_API_ORIGIN } from "$env/static/public";
import { POST } from "$lib/scripts/fetcher/methods.js";
import { request as sendRequest } from "$lib/scripts/fetcher/fetcher.js";
import { formToJson } from "$lib/scripts/form/formToJson.js";
import { createResponseOnToken } from "$lib/scripts/login/login.js";

let protocol = globalThis?.location?.protocol === "https:" ? "https:" : "http:";
let baseRoute = `${protocol}//${PUBLIC_API_ORIGIN}`;
let apiRoute = `${baseRoute}/api`;

/**
 * @type {Record<string, function>}
 */
const requestObj = {};

requestObj[REGISTER] = register;
requestObj[LOGIN] = login;

/**
 *
 * @param {FormData} data
 */
async function register(data) {
    const end = `/${REGISTER}`;
    const route = `${baseRoute}${end}`;

    return await sendPostForm(route, data);
}

/**
 *
 * @param {FormData} data
 * @returns
 */
async function login(data) {
    const end = `/${LOGIN_END}`;
    const route = `${apiRoute}${end}`;
    const json = formToJson(data);
    const headers = {
        "Content-Type": "application/json",
    };

    const result = await sendPostForm(route, json, headers);
    return createResponseOnToken(result);
}

/**
 *
 * @param {string} route
 * @param {FormData|string} data
 * @returns
 */
async function sendPostForm(route, data, headers = {}) {
    const options = {
        method: POST,
        headers,
        body: data,
    };

    let response = await sendRequest(route, options);

    return await response.json();
}

export const request = requestObj;

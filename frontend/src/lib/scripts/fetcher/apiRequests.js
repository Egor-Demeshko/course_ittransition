import {
    REGISTER,
    LOGIN,
    LOGIN_END,
    LOGOUT,
    REFRESH,
} from "$lib/data/consts.js";
import { PUBLIC_API_ORIGIN } from "$env/static/public";
import { POST } from "$lib/scripts/fetcher/methods.js";
import { request as sendRequest } from "$lib/scripts/fetcher/fetcher.js";
import { formToJson } from "$lib/scripts/form/formToJson.js";
import { createResponseOnToken } from "$lib/scripts/login/login.js";
import { RefreshTokenError } from "$lib/scripts/errors/RefreshTokenError.js";

export let protocol =
    globalThis?.location?.protocol === "https:" ? "https:" : "http:";
export let baseRoute = `${protocol}//${PUBLIC_API_ORIGIN}`;
export let apiRoute = `${baseRoute}/api`;
/**
 * This two used to different routes for request functions that used both on server and front
 */
export let FRONT_TYPE = "front";
export let SERVER_TYPE = "server";

/**
 * @type {Record<string, function>}
 */
const requestObj = {};

requestObj[REGISTER] = register;
requestObj[LOGIN] = login;
requestObj[LOGOUT] = logout;
requestObj[REFRESH] = refreshToken;

/**
 *
 * @param {FormData} data
 */
async function register(data) {
    const end = `/${REGISTER}`;
    const route = `${apiRoute}${end}`;

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

async function logout() {
    const route = `${apiRoute}/token/invalidate`;
    const options = {
        method: POST,
    };

    let response = await sendRequest(route, options);
    if (response.ok) {
        console.log("Logout success");
        return true;
    } else {
        return false;
    }
}

async function refreshToken() {
    const route = `${apiRoute}/token/refresh`;
    const options = {
        method: POST,
    };

    let response = await sendRequest(route, options);

    if (response.ok) {
        return await response.json();
    } else {
        throw new RefreshTokenError();
    }
}

export const request = requestObj;

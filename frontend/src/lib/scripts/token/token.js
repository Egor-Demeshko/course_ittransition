import { user } from "$lib/scripts/token/userStore.js";
import {
    saveToStorage,
    STORAGE_LOCAL,
    getDataFromStorage,
} from "$lib/scripts/storages/storages.js";
import { loginState } from "$lib/scripts/login/loginState.js";
import { get } from "svelte/store";
import { request } from "$lib/scripts/fetcher/apiRequests.js";
import { REFRESH } from "$lib/data/consts.js";

/**
 * @param {string} token
 * @returns {boolean}
 */
export function setDataFromToken(token, options = { storage: STORAGE_LOCAL }) {
    let result = false;

    try {
        /**@type {{header: ?{}, payload: ?{name: string, email: string, ext: number}, signuture: ?string}} */
        let data = decodeToken(token);

        setUser(data.payload);
        saveToken(data.payload, options.storage, token);

        result = true;
    } catch (e) {
        console.error(e);
    }

    return result;
}

/**
 * @param {string} token
 */
function decodeToken(token) {
    const [header, payload, signuture] = token.split(".");
    /**@type {{header: ?{}, payload: ?{name: string, email: string, ext: number}, signuture: ?string}} */
    const decodedObj = {};

    decodedObj.payload = JSON.parse(atob(payload));

    return decodedObj;
}

/**
 *
 * @param {?{name: string, email: string}} payload
 */
function setUser(payload) {
    let { name } = payload ? payload : { name: "Guest" };
    // @ts-ignore
    user.set({ name });
}

/**exp: 1715604105
​​
iat: 1715600505
​​
name: "test"
​​

 * 
 * @param {?{exp: number, name: string, email: string}} payload
 * @param {string} storage
 * @param {string} token 
 */
function saveToken(payload, storage, token) {
    if (!payload || !token) {
        throw new Error("payload or token is required!");
    }

    let exp = payload.exp ?? 0;
    let name = payload.name ?? "";
    let data = { exp, name, token };

    saveToStorage(storage, data);
}

export async function refresh() {
    return await request[REFRESH]();
}

export async function isToken(wasRefreshed = false) {
    /** @type {?string} */
    let tokenData = getDataFromStorage(STORAGE_LOCAL);

    if (tokenData) {
        let token = JSON.parse(tokenData);
        if (isFresh(token)) {
            get(loginState) || loginState.set(true);
            return true;
        } else {
            if (!wasRefreshed) {
                await refresh();
                return await isToken(true);
            }
            return false;
        }
    } else {
        return false;
    }
}

/**
 *
 * @param {{exp: number, token: string}} token
 */
function isFresh(token) {
    console.log(Math.floor(Date.now() / 1000) - token.exp);
    if (Math.floor(Date.now() / 1000) - token.exp < 0) {
        return true;
    } else {
        return false;
    }
}

export function getNameFromToken() {
    let tokenData = getDataFromStorage(STORAGE_LOCAL);
    if (tokenData) {
        return tokenData?.name ?? "";
    }

    return "";
}

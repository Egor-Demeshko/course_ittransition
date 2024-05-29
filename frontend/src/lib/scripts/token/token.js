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
import { normolizeTokenDataToStorage } from "$lib/scripts/normolize/tokenToStorage.js";

/**
 * @param {string} token
 * @returns {boolean}
 */
export function setDataFromToken(token, options = { storage: STORAGE_LOCAL }) {
    let result = false;

    try {
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
    if (!token || token === "") {
        throw new Error("Token is required!");
    }
    const [header, payload, signuture] = token.split(".");
    /**@type {{header: ?{}, payload: ?import('$types/types').TokenPayload, signuture: ?string}} */
    const decodedObj = {};

    decodedObj.payload = JSON.parse(atob(payload));

    return decodedObj;
}

/**
 *
 * @param {?import('$types/types').TokenPayload} payload
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
 * @param {?import('$types/types').TokenPayload} payload
 * @param {string} storage
 * @param {string} tokenToSave

 */
function saveToken(payload, storage, tokenToSave) {
    if (!payload) {
        throw new Error("payload or token is required!");
    }

    payload.token = tokenToSave;

    const obj = normolizeTokenDataToStorage(STORAGE_LOCAL, payload);

    let exp = obj.exp;
    let name = obj.name;
    let user_id = obj.user_id;
    let token = obj.token;
    let data = { exp, name, token, user_id };

    saveToStorage(storage, JSON.stringify(data));
}

export async function refresh() {
    /** @type {{token: string}} */
    const refreshData = await request[REFRESH]();
    const { payload } = decodeToken(refreshData.token);
    saveToken(payload, STORAGE_LOCAL, refreshData.token);
}

export async function isToken(wasRefreshed = false) {
    /** @type {?string} */
    let tokenData = getDataFromStorage(STORAGE_LOCAL);

    if (tokenData) {
        let { token, exp } = JSON.parse(tokenData);
        if (isFresh(exp)) {
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
 * @param {number} exp
 */
function isFresh(exp) {
    console.log(Math.floor(Date.now() / 1000) - exp);
    if (Math.floor(Date.now() / 1000) - exp < 0) {
        return true;
    } else {
        return false;
    }
}

export function getNameFromToken() {
    let tokenData = getDataFromStorage(STORAGE_LOCAL);
    if (tokenData) {
        let { name } = JSON.parse(tokenData);
        if (tokenData && name) {
            return name;
        }
    }

    return "";
}

export function getUserIdFromToken() {
    let tokenData = getDataFromStorage(STORAGE_LOCAL);
    if (tokenData) {
        let { user_id } = JSON.parse(tokenData);
        if (tokenData && user_id) {
            return user_id;
        }
    }
}

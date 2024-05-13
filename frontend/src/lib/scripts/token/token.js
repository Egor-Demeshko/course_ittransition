import { user } from "$lib/scripts/token/userStore.js";
import {
    saveToStorage,
    STORAGE_LOCAL,
} from "$lib/scripts/storages/storages.js";

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
    let data = { exp, token };

    saveToStorage(storage, JSON.stringify(data));
}

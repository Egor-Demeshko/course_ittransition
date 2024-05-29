import { writable } from "svelte/store";
import { loginState } from "$lib/scripts/login/loginState.js";
import {
    getNameFromToken,
    getUserIdFromToken,
} from "$lib/scripts/token/token.js";

/**
 * @description user data from token, {name: string}
 */
export const user = writable(null);

loginState.subscribe((value) => {
    if (value) {
        let name = getNameFromToken();
        let user_id = getUserIdFromToken();
        if (name && user_id) {
            user.update((value) => {
                if (value) {
                    // @ts-ignore
                    value.user_id = user_id;
                    value.name = name;
                    return value;
                } else {
                    return { name, user_id };
                }
            });
        }
    }
});

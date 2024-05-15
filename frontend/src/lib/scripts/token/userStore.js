import { writable } from "svelte/store";
import { loginState } from "$lib/scripts/login/loginState.js";
import { getNameFromToken } from "$lib/scripts/token/token.js";

/**
 * @description user data from token, {name: string}
 */
export const user = writable(null);

loginState.subscribe((value) => {
    if (value) {
        let name = getNameFromToken();
        if (name) {
            user.update((value) => {
                if (value) {
                    // @ts-ignore
                    return (value.name = name);
                } else {
                    return { name };
                }
            });
        }
    }
});

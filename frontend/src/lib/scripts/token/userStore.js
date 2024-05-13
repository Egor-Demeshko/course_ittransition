import { writable } from "svelte/store";

/**
 * @description user data from token, {name: string}
 */
export const user = writable(null);

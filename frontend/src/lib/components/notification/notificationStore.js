import { writable } from "svelte/store";

/** @description objects inside array with {message: string, type: string} */
export const notifications = writable([]);

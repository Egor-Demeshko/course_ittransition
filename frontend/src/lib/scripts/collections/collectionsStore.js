import { writable } from "svelte/store";
import { CATEGORIES } from "$lib/data/texts.js";

/** @type {import("svelte/store").Writable<Record<string, (import('$types/types').Collection)>>} */
export const collectionsStore = writable({});

import { collectionsStore as collections } from "$lib/scripts/collections/collectionsStore.js";
import { get } from "svelte/store";
//
// /**
//  * @returns {Collection}
//  */
// function getObjectScheme() {
// return {
// id: 0,
// title: "",
// description: ``,
// image: null,
// date: "",
// fields: [],
// };
// }
//
// /**
//  *
//  * @param {Collection[]} data
//  */
// export function setData(data) {
// /**
//  * @type {Collection[]}
//  */
// const arr = [];
//
// data.forEach((collection) => {
// const sheme = getObjectScheme();
// sheme.title = collection.title;
// sheme.description = collection.description;
// sheme.image = collection.image;
// sheme.date = collection.date;
// sheme.fields = collection.fields;
// });
//
// collections.set(arr);
// }
//
// export function getData() {
// return get(collections);
// }
//

import { additionalContentToApp } from "$normolizers/additionalContentToApp";
import { getTagLinkObj } from "$utils/DTO/getTagLinkObj";
import { writable } from "svelte/store";

const store = (function createStore() {
    const { update, subscribe, set } = writable({});

    return {
        subscribe,
        set,
        addTag: (tagLink) => {
            update((item) => {
                const obj = getTagLinkObj();

                for (let [key, tag] of Object.entries(tagLink)) {
                    obj.id = +key;
                    obj.tag.id = tag.tag.id;
                    obj.tag.value = tag.tag.value;
                    item.tags[key] = obj;
                }
                return item;
            });
        },

        deleteTag: (id) => {
            update((item) => {
                delete item.tags[id];
                return item;
            });
        },
        /** @param {import('$types/types').AdditionalContent} data*/
        addAdditionalContent: (data) => {
            let additionalContent = additionalContentToApp(data);
            update(
                /** @param {import('$types/types').Item} item */
                (item) => {
                    const newarr = [
                        additionalContent,
                        ...item.additional_content,
                    ];
                    item.additional_content = newarr;
                    return item;
                }
            );
        },
    };
})();

export const singleItemStore = store;

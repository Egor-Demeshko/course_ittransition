import { writable } from "svelte/store";
import { CATEGORIES } from "$lib/data/texts.js";

/**
 * @type {{[key: string]:import('$types/types').Collection}}
 */
let collections = {
    "/api/collections/999": {
        id: "/api/collections/999",
        title: "Название коллекции",
        description: `<p>[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.</p>
            <p>[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.</p>`,
        image: null,
        category: CATEGORIES[3 + 1],
        modifed_at: null,
        fields: [
            {
                type: "string",
                label: "Label to field",
            },
            {
                type: "date",
                label: "Label to a date",
            },
            {
                type: "integer",
                label: "Label to a date",
            },
        ],
    },
    "/api/collections/998": {
        id: "/api/collections/998",
        title: "Вторая коллекции",
        description: `[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum. 
            [Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.`,
        image: null,
        modifed_at: "2022-01-01T05:44:00.000Z",
        category: CATEGORIES[1 + 1],
        fields: [
            {
                type: "string",
                label: "Label to field",
            },
            {
                type: "date",
                label: "Label to a date",
            },
            {
                type: "integer",
                label: "Label to a date",
            },
            {
                type: "checkbox",
                label: "Label to a date",
            },
        ],
    },
};

/** */
export const collectionsStore = writable(collections);

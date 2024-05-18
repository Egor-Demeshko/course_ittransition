import { writable } from "svelte/store";
import { BOOKS, SILVERWARE } from "$lib/data/texts.js";

/**
 * @type {{[key: number]:import('$types/types').Collection}}
 */
let collections = {
    1: {
        id: 0,
        title: "Название коллекции",
        description: `<p>[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.</p>
            <p>[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.</p>`,
        image: null,
        category: SILVERWARE,
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
    2: {
        id: 1,
        title: "Вторая коллекции",
        description: `[Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum. 
            [Markdown]Lorem ipsum dolor sit amet consectetur. Imperdiet at orci quam ultricies egestas vestibulum. Morbi fermentum sed vulputate enim amet ultricies tellus. Risus duis dui amet pulvinar duis pretium massa aliquet. Semper tristique ipsum augue nisl urna arcu volutpat cursus vestibulum.`,
        image: null,
        modifed_at: "2022-01-01T05:44:00.000Z",
        category: BOOKS,
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

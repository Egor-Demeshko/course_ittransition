import {
    errorsmap,
    COLLECTION,
    DELETE_ITEMS,
    ITEM,
    DELETE,
} from "$fetcher/apimap";

export class DeleteItemsError extends Error {
    constructor(single = "") {
        if (single && single === "single") {
            super(errorsmap[ITEM][DELETE]);
        } else {
            super(errorsmap[COLLECTION][DELETE_ITEMS]);
        }
        this.name = "DeleteItemsError";
    }
}

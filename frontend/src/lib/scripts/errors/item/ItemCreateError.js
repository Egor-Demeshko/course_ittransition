import { errorsmap, ITEM, CREATE } from "$fetcher/apimap";

export class ItemCreateError extends Error {
    constructor() {
        const message = errorsmap[ITEM][CREATE];
        super(message);
        this.name = "ItemCreateError";
    }
}

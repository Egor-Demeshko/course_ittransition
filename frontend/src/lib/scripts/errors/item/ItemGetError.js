import { ITEM, errorsmap } from "$fetcher/apimap";
import { GET } from "$fetcher/methods";

export class ItemGetError extends Error {
    constructor() {
        const message = errorsmap[ITEM][GET];
        super(message);
        this.name = "ItemGetError";
    }
}

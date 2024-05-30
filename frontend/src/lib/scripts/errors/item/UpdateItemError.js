import { ITEM, UPDATE, errorsmap } from "$fetcher/apimap";

export class UpdateItemError extends Error {
    constructor() {
        super(errorsmap[ITEM][UPDATE]);
        this.name = "UpdateItemError";
    }
}

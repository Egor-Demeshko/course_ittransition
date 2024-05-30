import { TAGLINK, errorsmap, CREATE } from "$fetcher/apimap";

export class TagCreateError extends Error {
    // @ts-ignore
    constructor(message = "") {
        super(errorsmap[TAGLINK][CREATE] + (message ? " - " + message : ""));
        this.name = "TagCreateError";
    }
}

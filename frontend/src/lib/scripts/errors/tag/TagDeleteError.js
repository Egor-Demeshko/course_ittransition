import { DELETE, TAGLINK, errorsmap } from "$fetcher/apimap";

export class TagDeleteError extends Error {
    constructor(additional = "") {
        const message = errorsmap[TAGLINK][DELETE];
        super(message + (additional ? " - " + additional : ""));
        this.name = "TagDeleteError";
    }
}

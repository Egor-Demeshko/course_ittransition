import { ADDITIONAL_FIELD } from "$data/texts";
import { CREATE, errorsmap } from "$fetcher/apimap";

export class AdditionalContentCreateError extends Error {
    constructor(additional = "") {
        const message = errorsmap[ADDITIONAL_FIELD][CREATE];
        super(message + (additional ? " - " + additional : ""));
        this.name = "AdditionalContentCreateError";
    }
}

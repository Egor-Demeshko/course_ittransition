import { INVALID_DATA } from "$data/texts";

export class InvalidDataError extends Error {
    constructor(additional = "") {
        const message = INVALID_DATA;
        super(message + (additional ? " - " + additional : ""));
        this.name = "InvalidDataError";
    }
}

import { ADDITIONAL_FIELD_ERROR } from "$data/texts";

export class AdditionalFieldError extends Error {
    constructor() {
        const message = ADDITIONAL_FIELD_ERROR;
        super(message);
        this.name = "AdditionalFieldError";
    }
}

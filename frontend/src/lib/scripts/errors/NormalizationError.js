import { NORMALIZATION_ERROR_TEXT } from "$data/texts";

export class NormalizationError extends Error {
    constructor() {
        super(NORMALIZATION_ERROR_TEXT);
        this.name = "NormalizationError";
    }
}

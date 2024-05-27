import { InvalidDataError } from "$errors/InvalidDataError";

export function customHandlerError(error) {
    const message = error.success_message;

    if (message) {
        throw new InvalidDataError(message);
    }
}

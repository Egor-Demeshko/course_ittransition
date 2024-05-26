import {
    addNotification,
    errorNotificationType,
} from "$notification/notification";
import { GENERAL_ERROR } from "$data/texts";

/**
 *
 * @param {Error} error
 * @param {{[key: string]: function}} errorsToShow  - errors that should be shown to user
 */
export function handleFrontError(error, errorsToShow) {
    if (errorsToShow[error.name]) {
        addNotification(errorNotificationType, error.message);
    } else {
        addNotification(errorNotificationType, GENERAL_ERROR);
    }
    console.error(error.message);
}

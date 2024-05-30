import { notifications } from "./notificationStore.js";

export const successNotificationType = "success";
export const errorNotificationType = "error";
/**
 * @param {string} type
 * @param {string} message
 */
export function addNotification(type, message) {
    notifications.update((notifocations) => {
        // @ts-ignore
        notifocations.push({
            type,
            message,
        });
        return notifocations;
    });
}

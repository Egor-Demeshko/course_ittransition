import { notifications } from "$lib/components/notification/notificationStore";
import {
    successNotificationType,
    errorNotificationType,
} from "$lib/components/notification/notification.js";
import { IMAGE_UPLOAD_ERROR, IMAGE_UPLOAD_SUCCESS } from "$lib/data/texts.js";

/**
 * @type {any}
 */
let uploadManager;
if (globalThis?.Bytescale) {
    uploadManager = new Bytescale.UploadManager({
        apiKey: "public_kW15c4aGWhsTb7dCnc9mWrgr5a6W",
    });
}

/**
 *
 * @param {File} file
 */
export async function saveFile(file) {
    try {
        const { fileUrl } = await uploadManager.upload({
            data: file,
        });

        notifications.update((notifications) => {
            // @ts-ignore
            notifications.push({
                type: successNotificationType,
                message: IMAGE_UPLOAD_SUCCESS,
            });
            return notifications;
        });

        return fileUrl;
    } catch (e) {
        // @ts-ignore
        console.log(`Error:\n${e.message}`);
        // @ts-ignore
        notifications.update((notifications) => {
            // @ts-ignore
            notifications.push({
                type: errorNotificationType,
                message: IMAGE_UPLOAD_ERROR,
            });
            return notifications;
        });
    }
}

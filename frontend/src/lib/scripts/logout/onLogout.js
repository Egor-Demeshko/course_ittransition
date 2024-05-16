import {
    clearStorageValueByKey,
    STORAGE_LOCAL,
    TOKEN_STORAGE_KEY,
} from "$lib/scripts/storages/storages.js";
import { request } from "$lib/scripts/fetcher/apiRequests.js";
import { addNotification } from "$lib/components/notification/notification.js";
import { user } from "../token/userStore";
import { goto } from "$app/navigation";

export async function onLogout() {
    const { logout } = request;

    try {
        let result = await logout();
        if (result) {
            clearStorageValueByKey(STORAGE_LOCAL, TOKEN_STORAGE_KEY);
            // @ts-ignore
            addNotification("success", "Logout successful!");
            user.set(null);
            if (window.location.href !== "/") {
                goto("/");
            }
            return;
        }
    } catch (e) {
        console.log("Logout Error", e);
    }

    addNotification("error", "Logout error!");
}

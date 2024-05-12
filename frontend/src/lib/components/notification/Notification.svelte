<script>
    import { onMount } from "svelte";
    import { notifications } from "./notificationStore.js";
    import { fly } from "svelte/transition";

    onMount(() => {
        let intervalId = setInterval(updateNotifications, 10000);

        return () => clearInterval(intervalId);
    });

    function updateNotifications() {
        notifications.update((notifications) => {
            if (notifications.length > 0) {
                return notifications.slice(1);
            }

            return notifications;
        });
    }
</script>

<div class="notification">
    {#each $notifications as notification, i (i)}
        <div
            class="notification__message {notification.type}"
            in:fly={{ x: 100 }}
            out:fly={{ y: 100 }}
        >
            {notification.message}
        </div>
    {/each}
</div>

<style>
    .notification {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        z-index: 100;
        max-width: 240px;
        color: var(--font-white);
        font-family: Poppins, sans-serif;
    }

    .notification__message {
        padding: 1rem 1.25rem;
        font-weight: bold;
        border-radius: 6px;
        line-height: 1.4;
    }

    .notification__message.success {
        background-color: var(--success);
    }

    .notification__message.error {
        background-color: var(--danger);
    }
</style>

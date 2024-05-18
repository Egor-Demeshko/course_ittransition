<script>
    import Button from "$lib/components/Controlls/Button.svelte";
    import { ADD_COLLECTION } from "$lib/data/texts.js";
    import {
        apimap,
        errorsmap,
        COLLECTION,
        CREATE,
    } from "$lib/scripts/fetcher/apimap.js";
    import {
        addNotification,
        errorNotificationType,
    } from "$lib/components/notification/notification.js";
    import { collectionsStore } from "$lib/scripts/collections/collectionsStore.js";

    async function clickHandler() {
        try {
            /**@type {import('$types/types').Collection}*/
            const result = await apimap[COLLECTION][CREATE]();
            if (result) {
                collectionsStore.update((collections) => {
                    return { [result.id]: result, ...collections };
                });
            }
        } catch (e) {
            console.error("Error on api request.");
            addNotification(
                errorNotificationType,
                errorsmap[COLLECTION][CREATE]
            );
        }
    }
</script>

<Button size="small" {clickHandler}>
    <div class="align">
        <div class="plus">
            <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                    fill="currentColor"
                />
            </svg>
        </div>
        <span>{ADD_COLLECTION}</span>
    </div>
</Button>

<style>
    .plus {
        height: 100%;
    }

    .plus svg {
        aspect-ratio: 1 / 1;
        width: 16px;
    }

    .align {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>

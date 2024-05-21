<script>
    import SingleCollection from "$lib/components/collection/SingleCollection.svelte";
    import { collectionsStore } from "$lib/scripts/collections/collectionsStore";
    import { collectionToApp } from "$lib/scripts/normolize/CollectionToApp.js";
    import { page } from "$app/stores";
    import {
        addNotification,
        errorNotificationType,
    } from "$lib/components/notification/notification.js";
    /**
     * @type {{[key: number]:import('$types/types').Collection}}
     */
    let collections = {};

    page.subscribe(({ data }) => {
        if (data && data?.status) {
            const collections = data.data["hydra:member"] ?? null;
            if (!collections) return;
            collectionsStore.update((collectionMap) => {
                if (!collections) return collectionMap;

                collections.forEach((collectionRaw) => {
                    if (collectionRaw) {
                        const collect = collectionToApp(collectionRaw);
                        collectionMap[collect.id] = collect;
                    }
                });

                return { ...collectionMap };
            });
        } else {
            addNotification(errorNotificationType, "Error on api request.");
        }
    });

    collectionsStore.subscribe((data) => {
        collections = data;
    });
</script>

<div>
    {#key collections}
        {#each Object.values(collections) as collection}
            <SingleCollection {collection} />
        {/each}
    {/key}
</div>

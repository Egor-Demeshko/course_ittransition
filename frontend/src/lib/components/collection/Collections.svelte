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
                /**@type {Record<string, (import('$types/types').Collection)>}*/
                const newCollectionMap = {};

                collections.forEach((collectionRaw) => {
                    if (collectionRaw) {
                        const collect = collectionToApp(collectionRaw);
                        newCollectionMap[collect.id] = collect;
                    }
                });

                return { ...newCollectionMap };
            });
        } else {
            addNotification(errorNotificationType, "Error on api request.");
        }
    });

    collectionsStore.subscribe((data) => {
        collections = data;
    });

    function deleteCollectionFromPull({ detail }) {
        collectionsStore.update((collections) => {
            const newCollection = { ...collections };
            // @ts-ignore
            delete newCollection[detail];

            return newCollection;
        });
    }
</script>

<div>
    {#key collections}
        {#each Object.values(collections) as collection}
            <SingleCollection
                {collection}
                on:collection_was_deleted={deleteCollectionFromPull}
            />
        {/each}
    {/key}
</div>

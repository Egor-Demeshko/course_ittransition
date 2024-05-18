<script>
    import SingleCollection from "$lib/components/collection/SingleCollection.svelte";
    import { collectionsStore } from "$lib/scripts/collections/collectionsStore";

    /**
     * @type {{[key: number]:import('$types/types').Collection}}
     */
    let collections = [];

    collectionsStore.subscribe((data) => {
        collections = data;
    });
</script>

<div>
    {#each Object.values(collections) as collection}
        <SingleCollection {collection} />
    {/each}
</div>

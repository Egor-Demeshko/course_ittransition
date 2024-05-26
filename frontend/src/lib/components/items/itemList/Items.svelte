<script>
    import SingleItem from "./SingleItem.svelte";
    import { itemsStore } from "$components/items/itemsStores";

    /** @type {import('$types/types').ItemsList}*/
    let items = {};

    itemsStore.subscribe((itemsFromStore) => {
        items = itemsFromStore;
    });
</script>

<div class="item">
    {#key items}
        {#each Object.values(items) as item}
            <SingleItem {item} />
        {/each}
    {/key}
</div>

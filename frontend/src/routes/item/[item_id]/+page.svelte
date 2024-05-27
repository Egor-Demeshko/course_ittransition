<script>
    import BreadCrumbs from "$components/BreadCrumbs/BreadCrumbs.svelte";
    import ItemPageHeading from "$components/items/itemPage/ItemPageHeading.svelte";
    import { COLLECTIONS, ITEMS } from "$data/texts";
    import { STORAGE_LOCAL, getDataFromStorage } from "$storage/storages";
    import { onMount } from "svelte";

    /** @type {?number}*/
    let userId = null;

    let singleCollection = "";
</script>

<div class="wrapper">
    <BreadCrumbs
        links={[
            { name: COLLECTIONS, link: `/collections/${userId}` },
            { name: ITEMS, link: `/single-collection/${singleCollection}` },
        ]}
    />
    <ItemPageHeading />
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }
</style>

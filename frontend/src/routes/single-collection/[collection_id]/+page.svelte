<script>
    import BreadCrumbs from "$lib/components/BreadCrumbs/BreadCrumbs.svelte";
    import ItemsTop from "$components/items/itemsTop.svelte";
    import ItemList from "$components/items/ItemList.svelte";
    import {
        itemsStore,
        getItemsStoreObj,
    } from "$components/items/itemsStores.js";
    import { initialSetup } from "$components/Controlls/stores/checkboxesStore.js";

    export let data;
    const values = data?.data;

    if (values.items) {
        const itemsObj = getItemsStoreObj();
        const ids = [];
        for (let item of values.items) {
            itemsObj[item.id] = item;
            ids.push(item.id);
        }
        itemsStore.set(itemsObj);
        initialSetup(ids);
    }
</script>

<div class="wrapper">
    <BreadCrumbs />
    <ItemsTop data={values} />
    <ItemList data={values} />
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }
</style>

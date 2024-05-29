<script>
    import BreadCrumbs from "$lib/components/BreadCrumbs/BreadCrumbs.svelte";
    import ItemsTop from "$components/items/itemsTop.svelte";
    import ItemList from "$components/items/ItemList.svelte";
    import {
        itemsStore,
        getItemsStoreObj,
    } from "$components/items/itemsStores.js";
    import { initialSetup } from "$components/Controlls/stores/checkboxesStore.js";
    import { singleItemToApp } from "$normolizers/singleItemToApp.js";
    import { COLLECTIONS } from "$data/texts.js";

    export let data;
    const values = data?.data;
    let user_id = "";

    if (values.items) {
        const itemsObj = getItemsStoreObj();
        const ids = [];
        if (values?.user_id) {
            user_id = values.user_id;
        }

        for (let item of values.items) {
            itemsObj[item.id] = singleItemToApp(item);
            ids.push(item.id);
        }

        itemsStore.set(itemsObj);
        initialSetup(ids);
    }
</script>

<div class="wrapper">
    <BreadCrumbs
        links={[{ name: COLLECTIONS, link: `/collections/${user_id}` }]}
    />
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

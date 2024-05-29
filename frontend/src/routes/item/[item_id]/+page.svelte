<script>
    import BreadCrumbs from "$components/BreadCrumbs/BreadCrumbs.svelte";
    import AdditionalFields from "$components/items/itemPage/AdditionalFields.svelte";
    import ItemPageHeading from "$components/items/itemPage/ItemPageHeading.svelte";
    import { COLLECTION, COLLECTIONS, ITEMS } from "$data/texts";
    import { singleItemStore } from "$components/items/itemPage/singleItemStore";

    let collection = "";

    singleItemStore.subscribe((item) => {
        if (item.collection_id) {
            collection = item.collection_id;
        }
    });
</script>

<div class="wrapper">
    <BreadCrumbs
        links={[
            { name: COLLECTION, link: `/single-collection/${collection}` },
            { name: ITEMS, link: `` },
        ]}
    />
    <ItemPageHeading />

    <div class="additional_fields">
        <AdditionalFields />
    </div>
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }

    .additional_fields {
        padding-top: 1.625rem;
    }
</style>

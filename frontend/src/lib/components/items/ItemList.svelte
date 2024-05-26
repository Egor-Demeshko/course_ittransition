<script>
    import Header from "$components/items/itemList/Header.svelte";
    import Items from "$components/items/itemList/Items.svelte";

    export let data;
</script>

<Header collection_id={data?.id} />
<Items />

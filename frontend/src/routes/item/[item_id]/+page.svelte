<script>
    import BreadCrumbs from "$components/BreadCrumbs/BreadCrumbs.svelte";
    import ItemPageHeading from "$components/items/itemPage/ItemPageHeading.svelte";
</script>

<div class="wrapper">
    <BreadCrumbs />
    <ItemPageHeading />
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }
</style>

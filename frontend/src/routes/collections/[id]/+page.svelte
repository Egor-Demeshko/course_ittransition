<script>
    import BreadCrumbs from "$lib/components/BreadCrumbs/BreadCrumbs.svelte";
    import AddCollection from "$lib/components/Controlls/AddCollection.svelte";
    import Collections from "$lib/components/collection/Collections.svelte";
</script>

<div class="wrapper">
    <BreadCrumbs />
    <div class="add_button__position">
        <AddCollection />
    </div>

    <Collections />
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
    }

    .add_button__position {
        position: absolute;
        right: 0;
        top: 1rem;
    }

    @media screen and (max-width: 580px) {
        .add_button__position {
            position: fixed;
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
        }
    }
</style>

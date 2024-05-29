<script>
    import { MAIN_PAGE, BIGGEST_COLLECTION } from "$data/texts";
    import CollectionMain from "$lib/components/collection/CollectionMain.svelte";

    export let data = [];

    let topFive = data.data;
</script>

<div class="wrapper">
    <h1>{MAIN_PAGE}</h1>

    <div class="collections">
        <h4>{BIGGEST_COLLECTION}:</h4>
        <section>
            {#each topFive as collection}
                <CollectionMain {collection} />
            {/each}
        </section>
    </div>
</div>

<style>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
        padding-top: 1.25rem;
    }

    .collections {
        padding-top: 1.5rem;
    }

    h1 {
        font-size: 1.25rem;
        color: var(--dark-violet);
        font-family: Poppins, sans-serif;
    }

    h4 {
        font-size: 0.875rem;
        font-family: Poppins, sans-serif;
        color: var(--dark-violet);
    }

    section {
        padding: 0.875rem 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }
</style>

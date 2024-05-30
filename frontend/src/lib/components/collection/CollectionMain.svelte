<script>
    import { ITEMS_ } from "$data/texts";
    import MainTitleAndDescription from "./MainTitleAndDescription.svelte";

    export let collection;

    let { collection_id, title, description, image_link, item_quantity } =
        collection;
</script>

<div class="wrapper">
    <div class="image">
        {#if image_link}
            <img src={image_link} alt="collection" />
        {/if}
    </div>
    <div class="texts">
        <MainTitleAndDescription {collection_id} {title} {description} />
    </div>
    <div class="items">
        {ITEMS_}: {item_quantity}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        gap: 1.5rem;
    }

    .items,
    .image {
        flex: 0 0 4.25rem;
        height: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image {
        background-color: #d9d9d9;
        object-fit: cover;
    }

    .image img {
        display: block;
        width: 100%;
    }

    .texts {
        flex: 1;
    }

    .items {
        font-size: 0.875rem;
        font-family: Poppins, sans-serif;
        color: var(--grey);
    }
</style>

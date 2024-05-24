<script>
    import { page } from "$app/stores";
    import { CollectionsGetError } from "$errors/CollectionsGetError";
    import { RefreshTokenError } from "$errors/RefreshTokenError";
    import { handleFrontError } from "$errors/functions/handleFrontError";
    import { getCollections } from "$fetcher/collection/utils/getCollections.js";
    import { FRONT_TYPE } from "$fetcher/apiRequests.js";
    import {
        collectionsStore,
        updateCollectionStore,
    } from "$collections/collectionsStore";

    const maxItems = 5;
    let totalItems = $page?.data?.data["hydra:totalItems"] ?? 0;
    let totalPages = Math.ceil(totalItems / maxItems);
    /**
     * @type {Array<{index: number, active: boolean}>}
     */
    let pages = Array.from({ length: totalPages }, (_, i) => {
        return { index: i + 1, active: i === $page?.params?.user_id - 1 };
    });
    let block = false;

    async function getPagedCollections({ target }) {
        const pageToGet = +target?.dataset?.page ?? null;
        if (!pageToGet || block) return;
        for (let page of pages) {
            if (page.index === pageToGet && page.active) return;
            page.active = false;
            if (page.index === pageToGet) {
                page.active = true;
            }
        }
        block = true;
        try {
            const user_id = +$page?.params?.user_id;
            const data = await getCollections(user_id, pageToGet, FRONT_TYPE);
            const collections = data["hydra:member"] ?? [];
            collectionsStore.update((previousCollectionsMap) => {
                return updateCollectionStore(
                    previousCollectionsMap,
                    collections
                );
            });
        } catch (e) {
            handleFrontError(e, {
                [RefreshTokenError.name]: RefreshTokenError,
                [CollectionsGetError.name]: CollectionsGetError,
            });
        }
        block = false;
        pages = pages;
    }
</script>

<div on:click={getPagedCollections}>
    {#each pages as { index, active }}
        <button
            class:active
            aria-label="Show collections on page {index}"
            data-page={index}
        >
            {index}
        </button>
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        position: fixed;
        right: clamp(1rem, 7vw, 8rem);
        gap: 1rem;
        top: 50%;
        transform: translateY(-50%);
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.125rem;
        line-height: 1;
        font-family: Inter, sans-serif;
        border-radius: 10px;
        color: var(--font-white);
        background-color: var(--button-secondary);
        transition: background 0.4s ease;
        width: 2rem;
        height: 2rem;
        border: none;
        cursor: pointer;
    }

    button.active {
        background-color: var(--button-main);
    }

    button:hover {
        background-color: var(--button-secondary-hover);
    }

    button.active:hover {
        background-color: var(--button-main-hover);
    }
</style>

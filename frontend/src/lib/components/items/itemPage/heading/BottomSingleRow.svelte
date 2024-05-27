<script>
    import Tags from "$components/items/itemPage/Tags.svelte";
    import { WAS_NOT_MODIFIED, LAST_MODIFIED, ITEM_ID } from "$data/texts";

    export let item_id = 0;
    export let modified_at = WAS_NOT_MODIFIED;

    /**
     * @type {{[key: number]: import('$types/types').TagsLink}}
     */
    export let tags = {};
</script>

<div class="wrapper">
    <div class="data flex-1">
        <p class="modified">
            {`${LAST_MODIFIED}:`}
            <span>{modified_at ? modified_at : WAS_NOT_MODIFIED}</span>
        </p>
        <span class="item_id">{ITEM_ID}: {item_id}</span>
    </div>
    <div class="tags flex-1">
        {#key tags}
            <Tags {tags} />
        {/key}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        gap: 1rem;
    }
    .data {
        font-weight: bold;
        font-size: 1rem;
        color: var(--logo-background);
        font-family: Poppins, sans-serif;
        display: flex;
        gap: 6px;
        flex-direction: column;
        align-items: start;
    }

    .tags {
        display: flex;
        justify-content: end;
    }

    .flex-1 {
        flex: 1;
    }

    .modified {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    span {
        color: var(--grey);
        font-weight: normal;
    }

    .item_id {
        font-size: 1rem;
    }
</style>

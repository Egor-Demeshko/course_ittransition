<script>
    import { TAGS } from "$data/texts";
    /** @type {import('$types/types').TagsLink[]}*/
    export let tags = [];
</script>

<div class="wrapper">
    <p>{TAGS}:</p>
    <div class="tags">
        {#each Object.values(tags) as taglink}
            <div class="tag">
                <span data-taglink-id={taglink.id}>{taglink.tag.value}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-family: Poppins, sans-serif;
    }

    p {
        font-size: 0.875rem;
        color: var(--violet);
        font-weight: bold;
        line-height: 1;
    }

    .tags {
        display: flex;
        gap: 0.625rem;
        flex-wrap: wrap;
    }

    .tag {
        background-color: var(--light-violet);
        color: var(--white);
        border-radius: 10px;
        font-size: 0.75rem;
        padding: 0.31rem 0.75rem;
        cursor: normal;
        transition: background 0.4s ease;
    }

    .tag:hover {
        background-color: var(--violet);
    }
</style>

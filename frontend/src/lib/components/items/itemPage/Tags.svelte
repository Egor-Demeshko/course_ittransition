<script>
    import SingleTag from "./SingleTag.svelte";

    /**
     * @type {{[key: number]: import('$types/types').TagsLink}}
     * @description id here is TagLink id
     */
    export let tags = {};
</script>

<div>
    {#each Object.values(tags) as tagLink}
        <SingleTag {tagLink} />
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        position: relative;
    }

    @media screen and (max-width: 780px) {
        div {
            flex-wrap: nowrap;
            overflow-x: scroll;
            touch-action: pan-x;
        }
    }
</style>

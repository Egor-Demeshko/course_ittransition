<script>
    import SingleTag from "./SingleTag.svelte";

    /**
     * @type {{[key: number]: import('$types/types').Tag}}
     */
    export let tags = {};
</script>

<div>
    {#each tags as tag}
        <SingleTag {tag} />
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
</style>

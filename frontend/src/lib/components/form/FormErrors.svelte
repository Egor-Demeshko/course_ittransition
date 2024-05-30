<script>
    /** @type {[]}*/
    export let errors;
</script>

<ul>
    {#each errors as error}
        <li>{error}</li>
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        list-style: none;
        padding: 0;
        color: var(--danger);
    }
</style>

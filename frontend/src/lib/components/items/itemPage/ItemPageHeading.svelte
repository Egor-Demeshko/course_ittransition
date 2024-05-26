<script>
    import BottomSingleRow from "./heading/BottomSingleRow.svelte";
    import TopSingleRow from "./heading/TopSingleRow.svelte";
    import { page } from "$app/stores";

    const name = "Название";
    const modified_at = "1212-12-12";
    const id = 1;

    /**
     * @type {{[key: number]: import('$types/types').Tag}}
     */

    const tags = {
        1: { id: 1, value: "Tag1" },
        2: { id: 2, value: "Tag2" },
    };

    function changeTitle() {}
</script>

<div>
    <TopSingleRow {name} {id} on:col_title_changed={changeTitle} />
    <BottomSingleRow item_id={id} {modified_at} {tags} />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1.625rem;
        padding-top: 2.875rem;
        padding-bottom: 2.75rem;
        border-bottom: 4px solid var(--light-violet);
    }
</style>

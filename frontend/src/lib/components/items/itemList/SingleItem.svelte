<script>
    import CheckBox from "$components/Controlls/CheckBox.svelte";
    import ItemsLeft from "./ItemsLeft.svelte";
    import ItemsRight from "./ItemsRight.svelte";

    /**
     * @type {import('$types/types').Item}
     */
    export let item;
    let { id, name, modified_at, tags, additional_fields } = item;

    function setUpdatedData({ detail }) {
        let { modified_at_updated, name_updated } = detail;
        if (modified_at !== modified_at_updated) {
            modified_at = modified_at_updated;
        }
        if (name_updated && name_updated !== name) {
            name = name_updated;
        }
    }
</script>

<div class="item">
    <CheckBox {id} />
    <div class="elements">
        <ItemsLeft
            {id}
            {name}
            {additional_fields}
            on:col_title_changed={setUpdatedData}
        />
        <ItemsRight {id} {modified_at} {tags} />
    </div>
</div>

<style>
    .item {
        padding: 1.875rem 0;
        display: flex;
        gap: 2.875rem;
        align-items: center;
    }

    .elements {
        display: flex;
        justify-content: space-between;
        flex: 1;
    }
</style>

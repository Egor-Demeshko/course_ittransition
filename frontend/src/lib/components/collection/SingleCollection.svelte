<script>
    import LeftCollection from "$lib/components/collection/LeftCollection.svelte";
    import RightCollection from "$lib/components/collection/RightCollection.svelte";
    import Fields from "$lib/components/collection/Fields.svelte";
    import { ENTER_NAME } from "$lib/data/texts.js";
    /**
     * @type {import('$types/types.js').Collection}
     */
    export let collection;

    let { id, title, description, image, modifed_at, fields, category } =
        collection;

    function setCategory({ detail }) {
        category = detail;
    }

    function addField() {
        fields = [...fields, { label: ENTER_NAME, type: "string" }];
    }
    console.log(collection);
</script>

<section>
    <div class="left">
        <LeftCollection bind:title bind:description />
    </div>
    <div class="right">
        <RightCollection
            bind:image
            {modifed_at}
            {category}
            {fields}
            on:dropdown_changed={setCategory}
            on:col_field_added={addField}
        />
        <hr />
        {#if fields}
            <Fields {fields} />
        {/if}
    </div>
</section>

<hr style="margin: 0" />

<style>
    section {
        display: flex;
        padding-top: 4.5rem;
        padding-bottom: 2rem;
        gap: 1.75rem;
    }

    .left {
        flex: 1;
    }

    .right {
        flex: 1.28;
    }

    hr {
        border: 2px solid var(--border-active);
        border-radius: 2px;
        margin: 1.125rem 0;
    }
</style>

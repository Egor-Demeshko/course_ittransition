<script>
    import Field from "$lib/components/collection/Field.svelte";

    /**
     * @type {import('$types/types.js').AdditionalFieldLink[]}
     */
    export let fields = [];
    function changeFieldData({ detail }) {
        let { type = null, orderId = null } = detail;
        fields.forEach((fieldData, i) => {
            if (orderId !== i) return;

            if ((type && orderId) || (type && orderId === 0)) {
                fieldData["type"] = type;
            }
        });

        fields = fields;
    }

    function removeField({ detail }) {
        let orderId = detail;

        if (orderId || orderId === 0) {
            fields = fields.filter((_, i) => !(i === orderId));
        }
    }
</script>

<div class="fields">
    {#each fields as { id, field_data_id, label, type }, i}
        <Field
            {id}
            {field_data_id}
            {label}
            {type}
            orderId={i}
            on:col_field_changed={changeFieldData}
            on:col_field_removed={removeField}
        />
    {/each}
</div>

<style>
    .fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.375rem;
        flex-wrap: wrap;
    }
</style>

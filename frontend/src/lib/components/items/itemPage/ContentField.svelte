<script>
    import CheckBox from "$components/Controlls/CheckBox.svelte";
    import Input from "$components/form/Input.svelte";
    import { getAdditionalContentObj } from "$utils/DTO/getAdditionalContentObj";

    /** @type {import('$types/types').AdditionalContent}*/
    export let additionalContent = getAdditionalContentObj();

    /** @type {import('$types/types').AdditionalContent}*/
    let { id, type, content, label } = additionalContent;
</script>

{#if id > 0}
    <div>
        <span class="label">{label}:</span>
        {#if type === "String"}
            <Input value={content} name={content} />
        {:else if type === "Checkbox"}
            <CheckBox {id} />
        {:else if type === "date"}
            <Input type="date" value={content} />
        {:else if type === "Number"}
            <Input type="number" value={content} />
        {/if}
    </div>
{/if}

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .label {
        font-weight: bold;
        font-size: 0.875rem;
        color: var(--dark-violet);
        font-family: Poppins, sans-serif;
    }
</style>

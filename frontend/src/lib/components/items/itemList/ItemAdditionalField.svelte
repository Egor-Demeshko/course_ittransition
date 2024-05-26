<script>
    export let type = "";
    export let content = "";
    export let label = "";
</script>

<div class="additional_field">
    <span class="label">{label}:</span>
    <span class="content">{content}</span>
</div>

<style>
    .additional_field {
        border-radius: 10px;
        padding: 0.625rem 1rem;
        background-color: var(--light-violet);
        color: var(--dark-violet);
        font-family: Poppins, sans-serif;
        display: flex;
        gap: 1.125rem;
        align-items: center;
        line-height: 1;
        font-weight: bold;
        font-size: 0.875rem;
    }
</style>

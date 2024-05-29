<script>
    export let title = "";
    export let description = "";
    export let collection_id = "";
</script>

<div>
    <p class="title">
        <a href="/single-collection/{collection_id}">{title}</a>
    </p>
    <p class="description">{description}</p>
</div>

<style>
    div {
        font-family: Poppins, sans-serif;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .title {
        font-size: 0.75rem;
        font-weight: bold;
        color: var(--dark-violet);
    }

    a {
        text-decoration: none;
        color: var(--dark-violet);
        transition: color 0.4s ease;
    }

    .title:hover a {
        color: var(--violet);
    }

    .description {
        font-size: 0.75rem;
        font-weight: normal;
        color: var(--grey);
    }
</style>

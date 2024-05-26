<script>
    import Button from "$lib/components/Controlls/Button.svelte";
    import { PRIMARY } from "$data/consts";

    export let style = PRIMARY;

    /** @type {Function}*/
    export let clickHandler = () => {};
</script>

<Button size="small" {clickHandler} {style}>
    <div class="align">
        <div class="plus">
            <slot name="icon"></slot>
        </div>
        <slot name="text"></slot>
    </div>
</Button>

<style>
    .plus {
        height: 100%;
    }

    .align {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>

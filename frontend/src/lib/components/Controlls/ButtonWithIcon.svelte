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
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .align {
        display: flex;
        align-items: center;
        gap: clamp(0.6rem, 1.3vw, 1rem);
    }
</style>

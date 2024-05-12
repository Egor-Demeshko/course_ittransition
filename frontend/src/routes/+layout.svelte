<script>
    import TopSideBar from "$lib/components/TopSideBar.svelte";
    import Form from "$lib/components/Form.svelte";
    import { exportformFields } from "$lib/data/fields.js";
    import { REGISTER, LOGIN } from "$lib/data/consts.js";
    import Notification from "$lib/components/notification/Notification.svelte";
</script>

<TopSideBar />

<Form data={exportformFields[REGISTER]} />
<Form data={exportformFields[LOGIN]} />

<slot></slot>

<Notification />

<style>
    ::global(body) {
        overflow-x: hidden;
    }
</style>

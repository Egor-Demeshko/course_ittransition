<script>
    import TopSideBar from "$lib/components/TopSideBar.svelte";
    import Form from "$lib/components/Form.svelte";
    import { exportformFields } from "$lib/data/fields.js";
    import { REGISTER, LOGIN } from "$lib/data/consts.js";
</script>

<TopSideBar />

<Form data={exportformFields[REGISTER]} />
<Form data={exportformFields[LOGIN]} />

<slot></slot>

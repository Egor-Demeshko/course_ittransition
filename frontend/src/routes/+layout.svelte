<script>
    import TopSideBar from "$lib/components/TopSideBar.svelte";
    import Form from "$lib/components/Form.svelte";
    import { exportformFields } from "$lib/data/fields.js";
    import { REGISTER, LOGIN } from "$lib/data/consts.js";
    import Notification from "$lib/components/notification/Notification.svelte";
    import { isLoggined } from "$lib/scripts/login/isLoggined.js";
    import { onNavigate } from "$app/navigation";
    import { onMount } from "svelte";
    import ThemeToggler from "$components/ThemeToggler.svelte";

    let triggered = false;

    onMount(freezeCheckLogin);
    onNavigate(freezeCheckLogin);

    function freezeCheckLogin() {
        if (triggered) return;
        triggered = true;

        setTimeout(() => (triggered = false), 1000);
        checkLogin();
    }

    async function checkLogin() {
        await isLoggined();
    }
</script>

<TopSideBar />

<div class="container">
    <slot></slot>
</div>
<Form data={exportformFields[LOGIN]} />
<Form data={exportformFields[REGISTER]} />
<Notification />
<div>
    <ThemeToggler />
</div>

<style>
    ::global(body) {
        overflow-x: hidden;
    }

    @media screen and (max-width: 580px) {
        .container {
            padding: 0 1rem;
        }
    }
</style>

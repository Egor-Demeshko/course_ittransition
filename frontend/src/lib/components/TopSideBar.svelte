<script context="module">
    export const isLoggedIn = writable(false);
    export const formToOpen = writable("");
</script>

<script>
    import Logo from "$lib/components/Logo.svelte";
    import Search from "$lib/components/Search.svelte";
    import Account from "$lib/components/Account.svelte";
    import { REGISTER, LOGIN } from "$lib/data/consts.js";
    import { writable } from "svelte/store";
</script>

<header>
    <div class="logo">
        <Logo />
        <Search />
    </div>
    <div class="account">
        {#if $isLoggedIn}
            <Account />
        {:else}
            <div class="buttons">
                <button on:click={() => formToOpen.set(LOGIN)}> Login </button>
                <button on:click={() => formToOpen.set(REGISTER)}>
                    Register
                </button>
            </div>
        {/if}
    </div>
</header>

<style>
    header {
        padding: 1rem clamp(1rem, 3.1vw, 2.5rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 3rem;
        border-bottom: 2px solid var(--border);
    }

    .logo {
        width: clamp(1px, 43vw, 860px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 3;
        gap: 3rem;
    }

    .account {
        flex: 1;
        text-align: end;
    }

    button {
        border: none;
        background-color: transparent;
        color: var(--font-violet);
        cursor: pointer;
        font-family: Poppins, sans-serif;
        transition: color 0.4s ease;
    }

    button:hover {
        color: var(--logo-background);
    }
</style>

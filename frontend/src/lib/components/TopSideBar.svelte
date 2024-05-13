<script context="module">
    export const formToOpen = writable("");
</script>

<script>
    import Logo from "$lib/components/Logo.svelte";
    import Search from "$lib/components/Search.svelte";
    import Account from "$lib/components/Account.svelte";
    import { REGISTER, LOGIN } from "$lib/data/consts.js";
    import { writable } from "svelte/store";
    import { user } from "$lib/scripts/token/userStore.js";
    import { fade, fly } from "svelte/transition";
</script>

<header>
    <div class="logo">
        <Logo />
        <Search />
    </div>
    <div class="account">
        <div class="account__wrapper">
            {#if $user}
                <div
                    class="account_button"
                    in:fly={{ duration: 300, x: 100, delay: 300 }}
                >
                    <Account />
                </div>
            {:else}
                <div class="buttons" out:fly={{ duration: 300, y: -50 }}>
                    <button on:click={() => formToOpen.set(LOGIN)}>
                        Login
                    </button>
                    <button on:click={() => formToOpen.set(REGISTER)}>
                        Register
                    </button>
                </div>
            {/if}
        </div>
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

    .account__wrapper {
        position: relative;
    }

    .account_button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
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

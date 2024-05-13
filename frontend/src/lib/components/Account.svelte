<script>
    import { user } from "$lib/scripts/token/userStore.js";
    import { scale } from "svelte/transition";
    import { GUEST, HELLO, LOGOUT } from "$lib/data/texts";

    let open = false;

    // @ts-ignore
    $: name = $user?.name ?? GUEST;

    function clickHandler() {
        open = !open;
        if (open) {
            setTimeout(() => {
                document.body.addEventListener("click", () => (open = false), {
                    once: true,
                });
            }, 50);
        }
    }
</script>

<div class="account">
    <div class="icon" on:click={clickHandler}>
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 4V32C0 34.21 1.79 36 4 36H32C34.21 36 36 34.21 36 32V4C36 1.79 34.21 0 32 0H4C1.79 0 0 1.79 0 4ZM24 12C24 15.32 21.31 18 18 18C14.69 18 12 15.32 12 12C12 8.69 14.69 6 18 6C21.31 6 24 8.69 24 12ZM6 28C6 24 14 21.8 18 21.8C22 21.8 30 24 30 28V30H6V28Z"
                fill="currentColor"
            />
        </svg>
    </div>

    {#if open}
        <ul class="dropdown" transition:scale>
            <li style="cursor: default; pointer-events: none">
                {`${HELLO} ${name}`}
            </li>
            <hr />
            <button class="logout">{LOGOUT}</button>
        </ul>
    {/if}
</div>

<style>
    .account {
        color: var(--button-main);
        position: relative;
        font-family: Poppins, sans-serif;
    }

    svg {
        transition: color 0.4s ease;
    }

    .icon:hover {
        cursor: pointer;
        color: var(--button-main-hover);
    }

    .dropdown {
        width: max-content;
        position: absolute;
        right: 0;
        top: 102%;
        padding: 0.4rem 0;
        border-radius: 8px;
        list-style: none;
        margin: 0;
        background: var(--background);
        color: var(--font-main);
        border: 2px solid var(--border);
        box-shadow: var(--box-shadow);
    }

    .dropdown > * {
        width: 100%;
        text-align: right;
    }

    .logout,
    li {
        border: none;
        cursor: pointer;
    }

    hr {
        color: var(--logo-background);
        margin: 0.4rem 0 0.2rem;
    }

    .logout,
    li {
        background-color: transparent;
        transition: background 0.4s ease;
        padding: 0.4rem 0.875rem;
        border-radius: 6px;
    }

    .logout:hover,
    li:hover {
        background-color: var(--background-active);
    }
</style>

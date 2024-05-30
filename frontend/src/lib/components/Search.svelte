<div class="wrapper">
    <input type="text" placeholder="Search" />
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g opacity="0.5">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.91314 10.8263C8.6266 10.8263 10.8263 8.6266 10.8263 5.91314C10.8263 3.19969 8.6266 1 5.91314 1C3.19969 1 1 3.19969 1 5.91314C1 8.6266 3.19969 10.8263 5.91314 10.8263Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.71937 9.71886L12.8075 12.807"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
    </svg>
</div>

<style>
    .wrapper {
        position: relative;
        width: 100%;
    }

    input {
        padding: 0.5rem;
        border-radius: 5px;
        border: 2px solid transparent;
        background-color: var(--search-background);
        width: 100%;
        transition: border 0.4s ease;
    }

    input::placeholder {
        color: var(--font-grey);
    }

    input:hover {
        border: 2px solid var(--border-active);
    }

    .wrapper svg {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        transform: translateY(-50%);
        color: (--icon);
    }
</style>

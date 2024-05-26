<script>
    import ButtonWithIcon from "$components/Controlls/ButtonWithIcon.svelte";
    import Input from "$components/Controlls/Input.svelte";
    import { COL_TITLE_CHANGED } from "$data/consts";
    import { DEFAULT_TITLE, TAG } from "$data/texts";
    import { updateItem } from "$items/updateItem";
    import { createEventDispatcher } from "svelte";

    export let name = DEFAULT_TITLE;
    export let id = 0;

    let status = true;
    let addTagBlocked = false;
    const dispatch = createEventDispatcher();

    async function updateTitle(e) {
        if (!status) return;
        name = e.target.textContent;
        if (name === "") return;
        status = false;
        let reserved = name;
        const result = await updateItem(id, { name });

        if (result && result.modified_at) {
            let modified_at = result.modified_at;
            dispatch(COL_TITLE_CHANGED, { name, modified_at });
        } else {
            name = reserved;
        }

        status = true;
    }

    async function saveTag() {
        if (addTagBlocked) return;
        addTagBlocked = true;

        addTagBlocked = false;
    }
</script>

<div class="row">
    <div class="title">
        <h1 contenteditable={status} on:blur|stopPropagation={updateTitle}>
            {name}
        </h1>
    </div>
    <div class="input">
        <Input name={"tag"} />
        <div class="button">
            <ButtonWithIcon clickHandler={saveTag}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    slot="icon"
                >
                    <path
                        d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                        fill="currentColor"
                    />
                </svg>
                <span slot="text">{TAG}</span>
            </ButtonWithIcon>
        </div>
    </div>
</div>

<style>
    .row {
        display: flex;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: start;
        flex: 1;
        font-family: Poppins, sans-serif;
        font-weight: bold;
        color: var(--dark-violet);
    }

    h1 {
        font-size: 2.125rem;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--dark-violet);
        border: 2px solid transparent;
        transition: border 0.4s ease;
        border-radius: 4px;
        cursor: text;
    }

    h1:hover,
    h1:focus {
        border: 2px solid var(--border-active);
    }

    .input {
        display: flex;
        align-items: center;
        justify-content: end;
        flex: 1;
        color: var(--white);
        gap: 1.5rem;
    }

    .button {
        flex: 0;
    }
</style>

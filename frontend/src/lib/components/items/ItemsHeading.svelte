<script>
    import {
        COLLECTION_ID,
        LAST_MODIFIED,
        WAS_NOT_MODIFIED,
        TITLE_ERROR,
        COLLECTION_UPDATED,
    } from "$data/texts";
    import { updateCollectionSingleField } from "$fetcher/collection/utils/updateCollectionSingleField";
    import {
        addNotification,
        errorNotificationType,
        successNotificationType,
    } from "$notification/notification";

    export let modified_at = "default";
    export let title = "title";
    export let id = 0;

    let status = true;

    /** @param {Event} e*/
    async function updateTitle({ target }) {
        status = false;
        if (!target) return;
        // @ts-ignore
        if (target.textContent === "") {
            // @ts-ignore
            target.textContent = title;
            addNotification(errorNotificationType, TITLE_ERROR);
            return;
        }
        // @ts-ignore
        let reserved = title;
        title = target.textContent;

        const result = await updateCollectionSingleField(id, { title });

        if (result && result.status) {
            // @ts-ignore
            for (let obj of result?.data || []) {
                if (obj.modified_at) modified_at = obj.modified_at;
            }
            addNotification(successNotificationType, COLLECTION_UPDATED);
        } else if (!result?.status) {
            title = reserved;
            // @ts-ignore
            for (let error of result?.errors) {
                // @ts-ignore
                addNotification(errorNotificationType, error.message);
            }
        }

        status = true;
    }
</script>

<div class="headings">
    <h4 contenteditable={status} on:blur|stopPropagation={updateTitle}>
        {title}
    </h4>
    <div class="data">
        <p class="modified">
            {`${LAST_MODIFIED}:`}
            <span>{modified_at ? modified_at : WAS_NOT_MODIFIED}</span>
        </p>
        <span>{COLLECTION_ID}: {id}</span>
    </div>
</div>

<style>
    .headings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family: Poppins, sans-serif;
        width: 100%;
    }

    .modified {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    .data {
        font-weight: bold;
        font-size: 1rem;
        color: var(--logo-background);
    }

    h4 {
        font-size: clamp(1.7rem, 2.7vw, 2.125rem);
        line-height: clamp(1.7rem, 2.7vw, 2.125rem);
        font-weight: bold;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--font-violet);
        border: 2px solid transparent;
        transition: border 0.4s ease;
        border-radius: 4px;
        cursor: text;
    }

    h4:hover,
    h4:focus {
        border: 2px solid var(--border-active);
    }

    span {
        font-weight: normal;
        font-size: 1rem;
        line-height: 1;
        color: var(--grey);
        margin-top: 4px;
    }
</style>

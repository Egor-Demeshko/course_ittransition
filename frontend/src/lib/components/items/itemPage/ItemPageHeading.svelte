<script>
    import BottomSingleRow from "./heading/BottomSingleRow.svelte";
    import TopSingleRow from "./heading/TopSingleRow.svelte";
    import { page } from "$app/stores";
    import { DEFAULT_TITLE } from "$data/texts";
    import {
        addNotification,
        errorNotificationType,
    } from "$notification/notification";
    import { errorsmap, ITEM, SINGLE } from "$fetcher/apimap";
    import { singleItemStore } from "$components/items/itemPage/singleItemStore";
    import { getItemObject } from "$utils/DTO/getItemObject";

    let id = 1;
    let name = DEFAULT_TITLE;
    let modified_at = "1212-12-12";
    /**
     * @type {{[key: number]: import('$types/types').Tag}}
     */
    let tags = {};

    page.subscribe((page) => {
        const data = page?.data || null;

        if (!data || !data?.data) {
            addNotification(errorNotificationType, errorsmap[ITEM][SINGLE]);
            return;
        }
        const actualData = data.data;
        const item = getItemObject();

        item.id = actualData.id;
        item.name = actualData.name;
        item.modified_at = actualData.modified_at;
        item.tags = actualData.tags;
        item.fieldMetaData = actualData.fieldMetaData;
        item.additional_content = actualData.additional_content;
        item.collection_id = actualData.collection_id;
        singleItemStore.set(item);
    });

    singleItemStore.subscribe(
        //@ts-ignore
        (item) => {
            id = item.id;
            name = item.name;
            modified_at = item.modified_at;
            tags = item.tags;
        }
    );

    function changeTitle() {}
</script>

<div>
    <TopSingleRow {name} {id} on:col_title_changed={changeTitle} />
    <BottomSingleRow item_id={id} {modified_at} {tags} />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1.625rem;
        padding-top: 2.875rem;
        padding-bottom: 2.75rem;
        border-bottom: 4px solid var(--light-violet);
    }
</style>

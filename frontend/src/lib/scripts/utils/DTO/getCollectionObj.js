/**
 * @returns {import('$types/types').CollectionDTO}
 */
export const getCollectionObj = () => {
    return {
        title: "",
        description: "",
        cathegory: "",
        user: "",
    };
};

/**
 *
 * @returns {import('$types/types').Collection}
 */
export const getFullCollectionObj = () => {
    return {
        id: 0,
        title: "",
        description: "",
        image_link: "",
        category: "",
        modified_at: "",
        fields: [],
    };
};

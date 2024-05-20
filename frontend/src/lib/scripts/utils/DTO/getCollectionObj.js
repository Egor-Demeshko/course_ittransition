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
        id: "",
        title: "",
        description: "",
        image: "",
        category: "",
        modifed_at: "",
        fields: [],
    };
};

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

/**
 * @returns {import('$types/types').SingleCollection}
 */
export const getSingleCollectionObj = () => {
    return {
        id: 0,
        title: "",
        image_link: "",
        modified_at: "",
        additionalFields: [],
        items: [],
    };
};

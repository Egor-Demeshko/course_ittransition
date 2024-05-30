/**
 *
 * @returns {{ status: boolean, success_message: string, errors: {field: ?string, message: string}[] }}
 */
export function getNewObj() {
    return {
        status: false,
        success_message: "",
        errors: [],
    };
}

/**
 * @return {import('$types/types').ResponseObjWithData}
 */
export function getResponseObjWithData() {
    return {
        status: false,
        success_message: "",
        errors: [],
        data: [],
    };
}

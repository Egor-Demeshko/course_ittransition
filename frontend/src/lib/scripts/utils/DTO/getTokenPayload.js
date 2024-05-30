/**
 *
 * @returns {import('$types/types').TokenPayload}
 */
export function getTokenPayload() {
    return {
        name: "",
        exp: 0,
        user_id: +Infinity,
        token: "",
    };
}

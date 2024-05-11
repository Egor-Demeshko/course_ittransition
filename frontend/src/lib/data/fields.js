import { LOGIN, REGISTER } from "$lib/data/consts.js";
import { POST } from "$lib/scripts/fetcher/methods.js";

/**
 * @type {Record<string, []>}
 */
let fieldsContainer = {};

// @ts-ignore
fieldsContainer[REGISTER] = [
    {
        type: "text",
        name: "name",
        label: "Enter name",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Name",
    },
    {
        type: "email",
        name: "email",
        label: "Enter email",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Email",
    },
    {
        type: "password",
        name: "password",
        label: "Enter password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
    {
        type: "password",
        name: "password_2",
        label: "Repeat password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
];

// @ts-ignore
fieldsContainer[LOGIN] = [
    {
        type: "email",
        name: "email",
        label: "Enter email",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Email",
    },
    {
        type: "password",
        name: "password",
        label: "Enter password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
];

/**
 * @type {Record<string, {
 *    type: string,
 *    heading: string,
 *    primaryButtonText: string
 *      method: string }>}
 */
const formFields = {};

formFields[LOGIN] = {
    type: LOGIN,
    heading: "Login to your account",
    primaryButtonText: "Login",
    method: POST,
};

formFields[REGISTER] = {
    type: REGISTER,
    heading: "Register your account",
    primaryButtonText: "Register",
    method: POST,
};

export const fields = fieldsContainer;
export const exportformFields = formFields;

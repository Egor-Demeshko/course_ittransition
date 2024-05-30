import { LOGIN, REGISTER } from "$lib/data/consts.js";
import { POST } from "$lib/scripts/fetcher/methods.js";

/**
 * @type {Record<string, {[key: string]: any}>}
 */
let fieldsContainer = {};

// @ts-ignore
fieldsContainer[REGISTER] = {
    name: {
        type: "text",
        name: `${REGISTER}[name]`,
        label: "Enter name",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Name",
    },
    email: {
        type: "email",
        name: `${REGISTER}[email]`,
        label: "Enter email",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Email",
    },
    password: {
        type: "password",
        name: `${REGISTER}[password][first]`,
        label: "Enter password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
    password_repeat: {
        type: "password",
        name: `${REGISTER}[password][second]`,
        label: "Repeat password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
};

// @ts-ignore
fieldsContainer[LOGIN] = {
    email: {
        type: "email",
        name: "username",
        label: "Enter email",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Email",
    },
    password: {
        type: "password",
        name: "password",
        label: "Enter password",
        value: null,
        invalid: false,
        error: null,
        placeholder: "Password",
        show_eye: true,
    },
};

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

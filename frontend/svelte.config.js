import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        csrf: {
            checkOrigin: process.env.NODE_ENV === "development" ? false : true,
        },

        alias: {
            $types: "src/lib/types",
            $data: "src/lib/data",
        },
    },
};

export default config;

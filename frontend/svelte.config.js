import adapter from "@sveltejs/adapter-node";

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
            $fetcher: "src/lib/scripts/fetcher",
            $utils: "src/lib/scripts/utils",
            $errors: "src/lib/scripts/errors",
            $normolizers: "src/lib/scripts/normolize",
            $utils: "src/lib/scripts/utils",
            $token: "src/lib/scripts/token",
            $storage: "src/lib/scripts/storages",
            $notification: "src/lib/components/notification",
            $components: "src/lib/components",
            $collections: "src/lib/scripts/collections",
            $items: "src/lib/scripts/items",
            $tags: "src/lib/scripts/tags",
        },
    },
};

export default config;

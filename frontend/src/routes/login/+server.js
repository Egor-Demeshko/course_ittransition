// import { PUBLIC_API_ORIGIN, PUBLIC_API_PROTOCOL } from "$env/static/public";
// import { LOGIN_ROUTE } from "$env/static/private";
// import { formToJson } from "$lib/scripts/form/formToJson.js";
// import { request } from "$lib/scripts/fetcher/fetcher.js";
// import { getNewObj } from "$lib/scripts/utils/getResponseObj.js";
// import { POST as POST_STRING } from "$lib/scripts/fetcher/methods.js";

// export async function POST({ request }) {
//     let data = await request.formData();
//     const responseObj = getNewObj();
//     const result = await processLoginRequest(data, responseObj);

//     console.log(data);
// }

// /**
//  * @param {FormData} data
//  * @param {object} responseObj  */
// async function processLoginRequest(data, responseObj) {
//     // ${PUBLIC_API_PROTOCOL}${PUBLIC_API_ORIGIN}/api${LOGIN_ROUTE}
//     let route = `http://api.server/api/login_check`;
//     let json = formToJson(data);

//     const result = await makeLoginRequest(json, route);
//     console.log(result);
//     if (result.ok) {
//     }
// }

// /**
//  *  @param {string} data
//  *  @param {string} route
//  */
// async function makeLoginRequest(data, route) {
//     const options = {
//         method: POST_STRING,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: data,
//     };

//     console.log("route", route);

//     try {
//         return await request(route, options);
//     } catch (e) {
//         console.log("ERROR MESSAGE", e);
//         return e.message;
//     }
// }

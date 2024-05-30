import { getTopFiveObj } from "$utils/DTO/getTopFiveObj";

export function topFiveToApp(data) {
    const dataToParse = data["hydra:member"];
    const result = [];

    dataToParse.forEach((singleCollection) => {
        const obj = getTopFiveObj();
        for (let [key, value] of Object.entries(singleCollection)) {
            switch (key) {
                case "id":
                    obj.collection_id = Number.parseInt(value);
                case "title":
                    obj.title = value.toString();
                    break;
                case "image_link":
                    obj.image_link = value.toString();
                    break;
                case "description":
                    obj.description = value.toString();
                    break;
                case "item_quantity":
                    obj.item_quantity = Number.parseInt(value);
                    break;
            }
        }
        result.push(obj);
    });

    return result;
}

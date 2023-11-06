import { NetworkService } from "./NetworkService";

export const IngridientsService = {
    measureMapping(cookie, data, success, fail) {
        NetworkService.POSTAuth(`/ingridients/measures`, data, cookie, data => {
            success(data);
        }, fail);
    }
}
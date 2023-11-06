import { NetworkService } from "./NetworkService";
import { FrontendService } from "./FrontendService";

export const IngridientsService = {
    measureMapping(cookie, data, success, fail) {
        NetworkService.POSTAuth(`/ingridients/measures`, data, cookie, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
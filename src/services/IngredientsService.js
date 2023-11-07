import { NetworkService } from "./NetworkService";
import { FrontendService } from "./FrontendService";

export const IngredientsService = {
    measureMapping(cookie, data, success, fail) {
        NetworkService.POSTAuth(`/measures`, data, cookie, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
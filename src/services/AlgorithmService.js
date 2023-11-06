import { FrontendService } from "./FrontendService";
import { NetworkService } from "./NetworkService";

export const AlgorithmService = {
    calculateMenu(cookies, success, fail) {
        NetworkService.POSTAuth(`/menu/calculate`, {}, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    calculateCustom(cookies, data, success, fail) {
        NetworkService.POSTAuth(`/menu/custom`, data, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
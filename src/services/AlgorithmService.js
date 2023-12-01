import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { FrontendService } from "./FrontendService";
import { NetworkService } from "./NetworkService";

export const AlgorithmService = {
    calculateMenu(cookies, success, fail) {
        if(configuration.designMode) return success(designResponses.calculateMenu);
        NetworkService.POSTAuth(`/menu/calculate`, {"excluded": []}, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    calculateCustom(cookies, data, success, fail) {
        if(configuration.designMode) return success(designResponses.calculateCustom);
        NetworkService.POSTAuth(`/menu/calculate`, {"excluded": data.excludeDishes}, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
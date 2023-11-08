import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { NetworkService } from "./NetworkService";
import { FrontendService } from "./FrontendService";

export const IngredientsService = {
    measureMapping(cookie, data, success, fail) {
        if(configuration.designMode) return success(designResponses.measureMapping);
        NetworkService.POSTAuth(`/measures`, data, cookie, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
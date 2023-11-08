import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { NetworkService } from "./NetworkService";
import { FrontendService } from "./FrontendService";

export const RecipeService = {
    recipe(cookie, id, success, fail) {
        if(configuration.designMode) return success(designResponses.recipe);
        NetworkService.POSTAuth(`/recipes`, [id], cookie, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
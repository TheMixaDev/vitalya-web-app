import { NetworkService } from "./NetworkService";
import { FrontendService } from "./FrontendService";

export const RecipeService = {
    recipe(cookie, id, success, fail) {
        NetworkService.POSTAuth(`/recipes`, [id], cookie, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
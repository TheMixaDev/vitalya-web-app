import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { NetworkService } from "./NetworkService"
import { FrontendService } from "./FrontendService"

export const UserService = {
    authorize(cookies, telegram, success, fail) {
        if(configuration.designMode) return success(designResponses.authorize);
        NetworkService.GET(`/user/auth/telegram/${telegram}`, data => {
            cookies.set('auth', data.data.token, "1y");
            cookies.set('tg', telegram, "1y");
            success();
        }, fail);
    },
    getParams(cookies, success, fail) {
        if(configuration.designMode) return success(designResponses.getParams);
        NetworkService.GETAuth(`/user/params`, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    setParams(cookies, params, success, fail) {
        if(configuration.designMode) return success(designResponses.setParams);
        NetworkService.POSTAuth(`/user/params`, params, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    getCache(cookies, success, fail) {
        if(configuration.designMode) return success(designResponses.getCache);
        NetworkService.GETAuth(`/user/cache`, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    CRUDget(cookies, success, fail) {
        if(configuration.designMode) return success(designResponses.CRUDget);
        NetworkService.GETAuth(`/user`, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    CRUDcreate(telegram, user, success, fail) {
        if(configuration.designMode) return success(designResponses.CRUDcreate);
        NetworkService.POST(`/user/auth/telegram/${telegram}`, user, data => FrontendService.getDataFromResponse(data, success), fail);
    },
    CRUDpatch(cookies, user, success, fail) {
        if(configuration.designMode) return success(designResponses.CRUDpatch);
        NetworkService.PATCHAuth(`/user`, user, cookies, data => FrontendService.getDataFromResponse(data, success), fail);
    }
}
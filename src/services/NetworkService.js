import axios from "axios";
import { configuration } from "../misc/configuration";

export const NetworkService = {
    GET(url, success, fail) {
        (async () => {
            let response = await axios.get(`${configuration.serverUrl}${url}`).catch(fail);
            if(response)
                success(response);
        })();
    },
    POST(url, data, success, fail) {
        (async () => {
            let response = await axios.post(`${configuration.serverUrl}${url}`, data).catch(fail);
            if(response)
                success(response);
        })();
    },
    GETAuth(url, cookies, success, fail) {
        (async () => {
            let response = await axios.get(`${configuration.serverUrl}${url}`, {
                headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
            }).catch(fail);
            if(response)
                success(response);
        })();
    },
    POSTAuth(url, data, cookies, success, fail) {
        let config = {
            headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
        };
        (async () => {
            let response = await axios.post(`${configuration.serverUrl}${url}`, data, config).catch(fail);
            if(response)
                success(response);
        })();
    },
    PATCHAuth(url, data, cookies, success, fail) {
        (async () => {
            let response = await axios.patch(`${configuration.serverUrl}${url}`, data,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
                }).catch(fail);
            if(response)
                success(response);
        })();
    }
}
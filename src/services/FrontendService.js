export const FrontendService = {
    getMoveData() {
        let data = JSON.parse(sessionStorage.getItem("moveData"));
        if(!data) return null;
        sessionStorage.removeItem("moveData");
        return data;
    },
    setMoveData(data) {
        sessionStorage.setItem("moveData", JSON.stringify(data));
    },
    round(value) {
        let res = Math.round(value * 10) / 10;
        return res % 1 == 0 ? res+".0" : res;
    },
    cookingTime(timeInMinutes) {
        let hours = Math.floor(timeInMinutes / 60);
        let minutes = timeInMinutes % 60;
        if(hours < 1) return minutes+" минут";
        if(minutes < 1) return hours+" часов";
        return hours+" часов "+minutes+" минут";
    },
    notify(notifier, type, title, message) {
        notifier({
            title: title,
            text: message,
            type: type
        });
    },
    notifySuccess(notifier, message) {
        this.notify(notifier, "success", "Успешно", message);
    },
    notifyError(notifier, message) {
        this.notify(notifier, "error", "Ошибка", message);
    },
    getDataFromResponse(response, callback) {
        if(response.data)
            callback(response.data);
        else callback(response);
    }
}
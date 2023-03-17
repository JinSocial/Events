import $api from "http";

export default class YandexMapService {
    static async login(email, password) {
        return $api.post('/login', { Email: email, Password: password });
    }

    static async registration(username, email, password) {
        return $api.post('/registration', { Username: username, Email: email, Password: password });
    }

    static async logout() {
        return $api.post('/logout');
    }
}


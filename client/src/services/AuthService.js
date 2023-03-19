import $api from "http";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/auth/login', { userName: username, password: password });
    }

    static async register(username, email, password) {
        return $api.post('/auth/register', { userName: username, email: email, password: password });
    }
}
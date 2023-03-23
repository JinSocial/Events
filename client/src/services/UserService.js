import $api from "http";

export default class UserService {
    static async get(id) {
        return $api.get(`/users/${id}`);
    }
    
    static async getAll() {
        return $api.get(`/users`);
    }
}
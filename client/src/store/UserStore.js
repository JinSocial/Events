import axios from "axios";
import { API_URL } from "http";
import { makeAutoObservable } from "mobx";
import AuthService from "services/AuthService";

class UserStore {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth) {
        this.isAuth = isAuth;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password, callback) {
        try {
            const response = await AuthService.login(email, password);
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
            }
            callback(response);
        } catch (e) {
            console.error(e.message);
        }
    }

    async register(username, email, password, callback) {
        try {
            const response = await AuthService.register(username, email, password);
            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
            }
            callback(null);
        } catch (e) {
            callback(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.error(e.message);
        }
    }

    async checkAuth() {
        this.setLoading = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.error(e.message);
        } finally {
            this.setLoading = false;
        }
    }
}

export default UserStore;
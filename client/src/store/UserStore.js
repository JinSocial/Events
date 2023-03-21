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

    async login(username, password, callback) {
        try {
            const response = await AuthService.login(username, password);
            if (response.data) {
                localStorage.setItem('token', response.data);
                this.setAuth(true);
                this.setUser({username: username});
            }
            callback(null);
        } catch (e) {
            callback(e);
        }
    }

    async register(username, email, password, callback) {
        try {
            await AuthService.register(username, email, password);
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
        try {
            this.setAuth(true);
            this.setUser({username: "Test"});
        } catch (e) {
            console.error(e.message);
        }
    }
}

export default UserStore;
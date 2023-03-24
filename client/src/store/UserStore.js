import { makeAutoObservable } from "mobx";
import AuthService from "services/AuthService";
import UserService from "services/UserService";

class UserStore {
    user = {};
    users = [];
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

    setUsers(users) {
        this.users = users;
        for(let i = 0; i < this.users.length; i += 1) {
            this.users[i].rating = 4 + Math.random();
        }
    }

    async login(username, password, callback) {
        try {
            const response = await AuthService.login(username, password);
            if (response.data) {
                localStorage.setItem('token', response.data);
                this.setAuth(true);
                this.setUser({login: username});
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
        localStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({});
    }

    async checkAuth() {
        try {
            this.setAuth(true);
            this.setUser({login: "Test"});
        } catch (e) {
            console.error(e.message);
        }
    }

    async fetchUsers() {
        try {
            const response = await UserService.getAll();
            this.setUsers(response.data);
        } catch (e) {
            console.error(e.message);
        }
    }
}

export default new UserStore();
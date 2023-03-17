import { makeAutoObservable } from "mobx";

class ModalStore {
    isShowLogin = false;
    isShowRegistration = false;
    isShowProfile = false;

    constructor() {
        makeAutoObservable(this);
    }

    showLogin(show) {
        this.isShowRegistration = false;
        this.isShowLogin = show;
    }

    showRegistration(show) {
        this.isShowLogin = false;
        this.isShowRegistration = show;
    }

    showProfile(show) {
        this.isShowProfile = show;
    }
}

export default new ModalStore();
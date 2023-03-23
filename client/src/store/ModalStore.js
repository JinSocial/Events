import { makeAutoObservable } from "mobx";
import UserStore from "store/UserStore";

class ModalStore {
    isShowLogin = false;
    isShowRegistration = false;
    isShowProfile = false;
    isProjectOffcanvas = false;
    isCreateProjectOffcanvas = false;
    success = false;
    viewUser = {};

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

    showProfile(show, user) {
        this.viewUser = user;
        this.isShowProfile = show;
    }

    showProjectOffcanvas(show) {
        this.success = false;
        this.isProjectOffcanvas = show;
        this.isCreateProjectOffcanvas = false;
    }

    showCreateProjectOffcanvas(show) {
        this.isProjectOffcanvas = false;
        this.isCreateProjectOffcanvas = show;
    }

    setSuccess(success) {
        this.success = success;
    }
}

export default new ModalStore();
import { makeAutoObservable } from "mobx";

class ModalStore {
    isShowLogin = false;
    isShowRegistration = false;
    isShowProfile = false;
    isProjectOffcanvas = false;
    isCreateProjectOffcanvas = false;
    success = false;

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
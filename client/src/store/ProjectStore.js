import Project from "pages/Project";
import ProjectService from "services/ProjectService";
import MapStore from "store/MapStore";
import ModalStore from "store/ModalStore";
import { placemarkTypes } from "utils/utils";

const { makeAutoObservable } = require("mobx");

class ProjectStore {
    project = {
        title: "",
        point: null,
    };
    projects = [];
    projectsVisibleOptions = placemarkTypes.map(() => true);
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProject(id) {
        this.isLoading = true;
        try {
            const response = await ProjectService.get(id);
            this.setProject(response.data);
        } catch(e) {
            console.error(e.message);
        } finally {
            this.isLoading = false;
        }
    }

    setPoint(point) {
        this.project.point = point;
    }

    setProject(project) {
        this.project = this.fillProject(project);
    }

    openProjectOffcanvas(project) {
        this.project = project;
        ModalStore.showProjectOffcanvas(true);
    }

    async create(title, description, endDate, type, callback) {
        try {
            await ProjectService.create(title, description, endDate, this.project.point, type);
            this.fetchProjects();
            callback(null);
        } catch (e) {
            console.log(e);
            callback(e);
        }
    }

    async fetchProjects() {
        try {
            const response = await ProjectService.getAll();
            this.setProjects(response.data);
        } catch (e) {
            console.error(e.message);
        }
    }

    setProjects(projects) {
        this.projects = projects;
        for(let i = 0; i < this.projects.length; i += 1) {
            this.projects[i] = this.fillProject(this.projects[i]);
        }
    }

    setVisible(visible, type) {
        this.projectsVisibleOptions[type-1] = visible;
    }

    search(value) {
        for(let i = 0; i < this.projects.length; i += 1) {
            if(this.projects[i].title.startsWith(value)) {
                MapStore.zoom(this.projects[i].point);
                return true;
            }
        }
        return false;
    }

    fillProject(project) {
        project.projectMembers = [
            {user: {id: 0, login: "Миша"}, role: "Owner"},
            {user: {id: 1, login: "Кирилл"}, role: "Member"},
            {user: {id: 2, login: "Антон"}, role: "Member"},
        ]
        project.comments = [
            {id: 0, message: "Привет", date: "2023-03-23T12:22:17.365Z", user: {login: "Миша" }},
            {id: 1, message: "Вандалы!", date: "2023-03-23T12:22:17.365Z", user: {login: "Антон" }},
            {id: 2, message: "Как аватарку поменять?", date: "2023-03-23T12:22:17.365Z", user: {login: "Кирилл" }},
        ];
        return project
    }
}

export default new ProjectStore();
import $api from "http";

export default class ProjectService {
    static async create(title, description, endDate, point, type) {
        return $api.post('/add-project', { title: title, description: description,  point: {x: point[0], y: point[1]}, endDate: endDate, type: type });
    }

    static async getAll() {
        return $api.get('/projects');
    }
}
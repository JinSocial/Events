import $api from "http";

export default class ProjectService {
    static async create(title, description, date, point) {
        return $api.post('/add-project', { title: title, description: description,  point: {x: point[0], y: point[1]}});
    }
}
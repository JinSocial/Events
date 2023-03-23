import { useYMaps } from "@pbe/react-yandex-maps";
import MapStore from "store/MapStore";
import ProjectStore from "store/ProjectStore";
import { observer } from 'mobx-react-lite';

const Placemarks = () => {
    let ymaps = useYMaps(["Placemark"]);

    let placemarks = [];
    for (let i = 0; i < ProjectStore.projects.length; i += 1) {
        let project = ProjectStore.projects[i];
        let placemark = new ymaps.Placemark(
            [project.point.x, project.point.y], {
        }, {});
        placemark.data = project;
        placemark.events.add('click', (e) => ProjectStore.openProjectOffcanvas(e.originalEvent.target.data));
        placemarks.push(placemark)
    }
    MapStore.add(placemarks);

    return (
        <div></div>
    );
}

export default observer(Placemarks);
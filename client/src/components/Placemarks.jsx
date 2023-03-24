import { useYMaps } from "@pbe/react-yandex-maps";
import MapStore from "store/MapStore";
import ProjectStore from "store/ProjectStore";
import { observer } from 'mobx-react-lite';
import { placemarkTypesPresets } from "utils/utils";

const Placemarks = () => {
    let ymaps = useYMaps(["Placemark"]);

    let placemarks = [];
    for (let i = 0; i < ProjectStore.projects.length; i += 1) {
        let project = ProjectStore.projects[i];
        if (!ProjectStore.projectsVisibleOptions[project.type-1]) {
            continue;
        }
        let placemark = new ymaps.Placemark(
            [project.point.x, project.point.y], {
        }, {
            preset: placemarkTypesPresets[project.type-1]
        });
        placemark.data = project;
        placemark.events.add('click', (e) => ProjectStore.openProjectOffcanvas(e.originalEvent.target.data));
        placemarks.push(placemark);
    }
    MapStore.add(placemarks);

    return (
        <div></div>
    );
}

export default observer(Placemarks);
const { makeAutoObservable } = require("mobx");

const zoomRange = 0.005;

class MapStore {
    map = null;
    placemarks = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMap(map) {
        this.map = map;
    }

    add(placemarks) {
        if (this.map?.geoObjects && placemarks) {
            let rerender = true;
            if (placemarks.length === this.placemarks.length) {
                rerender = false;
                for (let i = 0; i < placemarks.length; i += 1) {
                    if (placemarks[i].geometry._coordinates[0] !== this.placemarks[i].geometry._coordinates[0]
                        || placemarks[i].geometry._coordinates[1] !== this.placemarks[i].geometry._coordinates[1]) {
                        rerender = true;
                        break;
                    }
                }
            }
            if (!rerender) {
                return;
            }
            for (let i = 0; i < this.placemarks.length; i += 1) {
                this.map.geoObjects.remove(this.placemarks[i]);
            }
            for (let i = 0; i < placemarks.length; i += 1) {
                this.map.geoObjects.add(placemarks[i]);
            }
            this.setPlacemarks(placemarks);
        }
    }

    setPlacemarks(placemarks) {
        this.placemarks = placemarks;
    }

    zoom(point) {
        this.map.setBounds([[point.x - zoomRange, point.y - zoomRange], [point.x + zoomRange, point.y + zoomRange]]);
        //this.map.center = [10, 10];
    }
}

export default new MapStore();
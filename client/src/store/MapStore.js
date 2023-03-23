const { makeAutoObservable } = require("mobx");

class MapStore {
    map = null;
    objectManager = null;
    placemarks = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMap(map) {
        this.map = map;
    }

    setObjectManager(objectManager) {
        this.objectManager = objectManager;
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
}

export default new MapStore();
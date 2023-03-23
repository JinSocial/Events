import { useYMaps } from "@pbe/react-yandex-maps";
import { Context } from "index";
import { useContext, useEffect, useRef } from "react";
import MapStore from "store/MapStore";
import ModalStore from "store/ModalStore";
import ProjectStore from "store/ProjectStore";
import UserStore from "store/UserStore";
import { placemarkTypes } from "utils/utils";

const Maps = () => {
    const mapRef = useRef(null);
    const ymaps = useYMaps(['Map', 'control.Button', 'control.ListBox', 'control.ListBoxItem', 'ObjectManager', 'control.GeolocationControl']);

    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }

        let map = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 10
        });

        let mode = 'search';

        map.events.add('click', function (e) {
            if (!ModalStore.isCreateProjectOffcanvas) {
                if (mode === 'edit') {
                    ProjectStore.setPoint(e.get('coords'));
                    ModalStore.showCreateProjectOffcanvas(true);
                    /*map.balloon.open(coords, {
                        contentHeader: 'Событие!',
                        contentBody: '<p>Кто-то щелкнул по карте.</p>' +
                            '<p>Координаты щелчка: ' + [
                                coords[0].toPrecision(6),
                                coords[1].toPrecision(6)
                            ].join(', ') + '</p>',
                        contentFooter: '<sup>Щелкните еще раз</sup>'
                    });*/
                }
            }
            else {
                ModalStore.showCreateProjectOffcanvas(false);
            }
        });

        let modeButton = new ymaps.control.Button({
            data: {
                content: "Режим создания",
            },
            options: {
                maxWidth: [170, 190, 220]
            }
        });
        modeButton.events.add('click', (e) => {
            if (!UserStore.isAuth) {
                alert("Нужно авторизироваться");
                return;
            }
            if (modeButton.isSelected() === true) {
                mode = 'search';
            } else {
                mode = 'edit';
            }
        });

        map.controls.add(modeButton, {
            position: {
                right: 10,
                top: 10
            }
        });

        let placemarkTypeslistBoxItems = [];

        for (let i = 0; i < placemarkTypes.length; i += 1) {
            let placemarkTypeslistBoxItem = new ymaps.control.ListBoxItem({
                data: {
                    content: placemarkTypes[i],
                    type: i + 1
                },
                state: {
                    selected: true
                }
            });
            placemarkTypeslistBoxItem.events.add('click', function (e) {
                ProjectStore.setVisible(!e.originalEvent.target.state._data.selected, e.originalEvent.target.data._data.type);
            });
            placemarkTypeslistBoxItems.push(placemarkTypeslistBoxItem);
        }

        let placemarkTypeslistBox = new ymaps.control.ListBox({
            items: placemarkTypeslistBoxItems,
            data: {
                content: "Проекты",
            }
        });

        map.controls.add(placemarkTypeslistBox, {
            position: {
                right: 150,
                top: 10
            }
        });

        let geolocationControl = new ymaps.control.GeolocationControl({});
        map.controls.add(geolocationControl);

        MapStore.setMap(map);
    }, [ymaps]);

    return <div ref={mapRef} className="w-100 h-100" />;
}

export default Maps;
import { useYMaps } from "@pbe/react-yandex-maps";
import { Context } from "index";
import { useContext, useEffect, useRef } from "react";
import ModalStore from "store/ModalStore";
import ProjectStore from "store/ProjectStore";

const Maps = () => {
    const userStore = useContext(Context);
    const mapRef = useRef(null);
    const ymaps = useYMaps(['Map', 'control.Button']);

    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }

        let map = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 10,
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

        let button = new ymaps.control.Button({
            data: {
                content: "Режим создания",
            },
            options: {
                maxWidth: [170, 190, 220]
            }
        });
        button.events.add('click', (e) => {
            if (!userStore.isAuth) {
                alert("Нужно авторизироваться");
                return;
            }
            if (button.isSelected() === true) {
                mode = 'search';
            } else {
                mode ='edit';
            }
        });

        map.controls.add(button, {
            position: {
                right: 10,
                top: 10
            }
        });
    }, [ymaps]);

    return <div ref={mapRef} style={{ width: '320px', height: '240px' }} className="w-100 h-100" />;
}

export default Maps;
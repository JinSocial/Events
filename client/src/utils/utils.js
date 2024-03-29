import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(ru);

export const timeformatter = new TimeAgo('ru');

export function dateToString(date) {
    const now = new Date();
    const pad = (i) => (i < 10) ? "0" + i : "" + i;

    if(now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDay() === date.getDay()) {
        return pad(date.getHours()) + ":" + pad(date.getMinutes());
    }

    return pad(date.getDate()) + "." + pad(1 + date.getMonth()) + "." + date.getFullYear();
}

export const placemarkTypes = ["Бытовые", "Научные", "Городские", "Социальные"];
export const placemarkTypesSingle = ["Бытовой", "Научный", "Городской", "Социальный"];
export const placemarkTypesPresets = ["islands#blueHomeCircleIcon", "islands#blueScienceCircleIcon", "islands#blueAutoCircleIcon", "islands#blueFamilyCircleIcon"];
export const rolesMap = new Map([
    ["Owner", "Владелец",],
    ["Member", "Участник"]
]);

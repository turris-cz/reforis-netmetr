/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { ALL_HOURS } from "./constants";

// Due to poor design of setFormValue function we need to pass there fake event to get it worked.
const fakeEvent = { target: { value: undefined } };

export default function useAutostartHours(hours, setFormValue) {
    function toggleHour(hour) {
        if (hours.includes(hour)) {
            deleteHour(hour);
        } else {
            addHour(hour);
        }
    }

    function addHour(hour) {
        updateHours({ $push: [hour] });
    }

    function deleteHour(hour) {
        const hourIndex = hours.findIndex((currentHour) => currentHour === hour);
        updateHours({ $splice: [[hourIndex, 1]] });
    }

    function selectAllHours() {
        updateHours({ $set: ALL_HOURS });
    }

    function unselectAllHours() {
        updateHours({ $set: [] });
    }

    function updateHours(updateRule) {
        setFormValue(() => (
            { hours_to_run: updateRule }
        ))(fakeEvent);
    }

    return [toggleHour, selectAllHours, unselectAllHours];
}

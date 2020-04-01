/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import "./AutostartHourButtons.css";
import { Button } from "foris";
import AutostartHourButton from "./AutostartHourButton";
import useAutostartHours from "./hooks";
import { ALL_HOURS } from "./constants";

export default function AutostartHoursButtons({ formData, setFormValue }) {
    const [
        toggleHour,
        selectAllHours,
        unselectAllHours,
    ] = useAutostartHours(formData.hours_to_run, setFormValue);

    return (
        <>
            <div className="btn-group">
                <Button
                    className="btn-sm btn-outline-info "
                    onClick={selectAllHours}
                >
                    {_("Select all")}
                </Button>
                <Button
                    className="btn-sm btn-outline-info"
                    onClick={unselectAllHours}
                >
                    {_("Unselect all")}
                </Button>
            </div>
            <div className="btn-group-toggle hour-buttons" data-toggle="buttons">
                {ALL_HOURS.map(
                    (hour) => (
                        <AutostartHourButton
                            key={hour}
                            hour_to_run={hour}
                            checked={formData.hours_to_run.includes(hour)}
                            onClick={() => toggleHour(hour)}
                        />
                    ),
                )}
            </div>
        </>
    );
}

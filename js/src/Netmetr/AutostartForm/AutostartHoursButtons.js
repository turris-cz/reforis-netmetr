/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import "./AutostartHourButtons.css";
import { Button } from "foris";
import AutostartHourButton from "./AutostartHourButton";
import useAutostartHours from "./hooks";
import { ALL_HOURS } from "./constants";

AutostartHoursButtons.propTypes = {
    formData: PropTypes.shape({
        autostart_enabled: PropTypes.bool.isRequired,
        hours_to_run: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    setFormValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default function AutostartHoursButtons({ formData, setFormValue, disabled }) {
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
                    disabled={disabled}
                >
                    {_("Select all")}
                </Button>
                <Button
                    className="btn-sm btn-outline-info"
                    onClick={unselectAllHours}
                    disabled={disabled}
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
                            disabled={disabled}
                        />
                    ),
                )}
            </div>
        </>
    );
}

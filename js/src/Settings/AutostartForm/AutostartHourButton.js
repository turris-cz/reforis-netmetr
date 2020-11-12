/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { toLocaleDateString } from "foris";
import { useUID } from "react-uid";
import PropTypes from "prop-types";

import "./AutostartHourButton.css";

AutostartHourButton.propTypes = {
    hour_to_run: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default function AutostartHourButton({
    hour_to_run,
    checked,
    ...props
}) {
    const uid = useUID();

    const createdAt = toLocaleDateString(hour_to_run, {
        inputFormat: "H",
        outputFormat: "LT",
    });

    return (
        <label
            htmlFor={uid}
            className={`btn btn-outline-secondary ${checked ? "active " : ""}`}
        >
            {createdAt}
            <input id={uid} type="checkbox" autoComplete="off" {...props} />
        </label>
    );
}

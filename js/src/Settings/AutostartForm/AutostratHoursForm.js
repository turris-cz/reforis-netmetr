/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import AutostartHoursButtons from "./AutostartHoursButtons";

AutostartHoursForm.propTypes = {
    formData: PropTypes.shape({
        autostart_enabled: PropTypes.bool.isRequired,
        hours_to_run: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    setFormValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default function AutostartHoursForm({
    formData,
    setFormValue,
    disabled,
}) {
    return (
        <>
            <h3>{_("Select autostart hours")}</h3>
            <AutostartHoursButtons
                formData={formData}
                setFormValue={setFormValue}
                disabled={disabled}
            />
        </>
    );
}

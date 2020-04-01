/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import AutostartHoursButtons from "./AutostartHoursButtons";

export default function AutostartHoursForm({
    formData, formErrors, setFormValue, disabled,
}) {
    return (
        <>
            <h4>{_("Select autostart hours")}</h4>
            <AutostartHoursButtons
                formData={formData}
                setFormValue={setFormValue}
            />
        </>
    );
}

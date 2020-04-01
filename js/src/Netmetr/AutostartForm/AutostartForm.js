/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { CheckBox } from "foris";

import AutostartHoursForm from "./AutostratHoursForm";

export default function AutostartForm({
    formData, formErrors, setFormValue, disabled,
}) {
    return (
        <>
            <h3>{_("Autostart")}</h3>
            <CheckBox
                label={_("Enabled")}
                checked={formData.autostart_enabled}
                onChange={setFormValue((value) => ({ autostart_enabled: { $set: value } }))}
            />
            {formData.autostart_enabled
                && (
                    <AutostartHoursForm
                        formData={formData}
                        setFormValue={setFormValue}
                        disabled={disabled}
                    />
                )}
        </>
    );
}

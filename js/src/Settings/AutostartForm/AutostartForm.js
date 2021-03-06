/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { Switch } from "foris";
import PropTypes from "prop-types";

import AutostartHoursForm from "./AutostratHoursForm";

AutostartForm.propTypes = {
    formData: PropTypes.shape({
        autostart_enabled: PropTypes.bool,
        hours_to_run: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
    setFormValue: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

AutostartForm.defaultProps = {
    formData: {
        autostart_enabled: false,
        hours_to_run: [],
    },
    setFormValue: () => {},
};

export default function AutostartForm({ formData, setFormValue, disabled }) {
    return (
        <>
            <h2>{_("Autostart")}</h2>
            <p>
                {_(
                    "Enable Autostart to allow automatic measurement on specific daily hours that can be chosen."
                )}
            </p>
            <Switch
                label={_("Enable Autostart")}
                checked={formData.autostart_enabled}
                onChange={setFormValue((value) => ({
                    autostart_enabled: { $set: value },
                }))}
            />
            {formData.autostart_enabled && (
                <>
                    <AutostartHoursForm
                        formData={formData}
                        setFormValue={setFormValue}
                        disabled={disabled}
                    />
                    <small>
                        <p className="text-muted">
                            {_(
                                "The requested start time is approximate. The measurement will start about the selected hour (time is no exact due to load distribution)."
                            )}
                        </p>
                    </small>
                </>
            )}
        </>
    );
}

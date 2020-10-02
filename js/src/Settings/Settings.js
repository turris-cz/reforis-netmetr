/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { ForisForm } from "foris";

import API_URLs from "API";
import AutostartForm from "./AutostartForm/AutostartForm";
import NetMetr from "../NetMetr";

Settings.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Settings({ ws }) {
    return (
        <NetMetr>
            <ForisForm
                ws={ws}
                forisConfig={{
                    endpoint: API_URLs.settings,
                    wsModule: "netmetr",
                }}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <AutostartForm />
            </ForisForm>
        </NetMetr>
    );
}

function prepDataToSubmit(data) {
    delete data.sync_code;
    return data;
}

function validator(formData) {
    const error = {};
    if (formData.autostart_enabled && formData.hours_to_run.length === 0) {
        error.hours_to_run = "Hours must be selected";
    }
    return error.hours_to_run ? error : undefined;
}

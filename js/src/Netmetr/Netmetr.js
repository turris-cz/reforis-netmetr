/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { ForisForm, useAPIGet } from "foris";

import API_URLs from "API";
import AutostartForm from "./AutostartForm/AutostartForm";

export default function Netmetr({ ws }) {
    return (
        <>
            <h1>Netmetr</h1>
            <p>{_("Netmeter measures your internet parameters like upload, download and response time.")}</p>
            <ForisForm
                ws={ws}
                forisConfig={{
                    endpoint: API_URLs.settings,
                    wsModule: "netmetr",
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <AutostartForm />
            </ForisForm>
        </>
    );
}

function prepDataToSubmit(data) {
    delete data.sync_code;
    return data;
}

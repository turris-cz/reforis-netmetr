/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ForisForm } from "foris";

import API_URLs from "API";
import AutostartForm from "./AutostartForm/AutostartForm";
import SyncCodeSetter from "./AutostartForm/SyncCodeSetter";
import Results from "./Results/Results";
import Controls from "./Controls/Controls";
import LinkToMyNetmetr from "./LinkToMyNetmetr";
import TestProgress from "./TestProgress/TestProgress";
import useNetmetrAlerts from "./hooks";

Netmetr.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Netmetr({ ws }) {
    const [syncCode, setSyncCode] = useState(null);
    const [asyncIdSpeedTest, setAsyncIdSpeedTest] = useState(null);
    const [asyncIdRedownloadData, setAsyncIdRedownloadData] = useState(null);

    useNetmetrAlerts(ws);

    return (
        <>
            <h1>{_("NetMetr")}</h1>
            <p>{_("NetMeter measures your internet parameters like upload, download and response time.")}</p>
            <ForisForm
                ws={ws}
                forisConfig={{
                    endpoint: API_URLs.settings,
                    wsModule: "netmetr",
                }}
                prepDataToSubmit={prepDataToSubmit}
            >
                <AutostartForm />
                <SyncCodeSetter setSyncCode={setSyncCode} />
            </ForisForm>
            <Controls
                ws={ws}

                asyncIdSpeedTest={asyncIdSpeedTest}
                setAsyncIdSpeedTest={setAsyncIdSpeedTest}

                asyncIdRedownloadData={asyncIdRedownloadData}
                setAsyncIdRedownloadData={setAsyncIdRedownloadData}
            />
            <TestProgress ws={ws} asyncId={asyncIdSpeedTest} />

            <Results ws={ws} />
            {syncCode && <LinkToMyNetmetr syncCode={syncCode} />}
        </>
    );
}

function prepDataToSubmit(data) {
    delete data.sync_code;
    return data;
}

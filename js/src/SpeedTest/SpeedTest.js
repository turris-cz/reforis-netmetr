/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useEffect } from "react";
import { useAPIGet } from "foris";
import PropTypes from "prop-types";

import TestProgress from "./TestProgress/TestProgress";
import Results from "./Results/Results";
import LinkToMyNetmetr from "./LinkToMyNetmetr";
import NetMetr from "../NetMetr";
import useNetmetrAlerts from "./hooks";
import API_URLs from "../API";
import StartTestButton from "./ControlButtons/StartTestButton";

SpeedTest.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function SpeedTest({ ws }) {
    useNetmetrAlerts(ws);
    const [asyncIdSpeedTest, setAsyncIdSpeedTest] = useState(null);
    const [asyncIdRedownloadData, setAsyncIdRedownloadData] = useState(null);

    const [getSettingsState, getSettingRequest] = useAPIGet(API_URLs.settings);
    useEffect(() => {
        getSettingRequest();
    }, [getSettingRequest]);

    return (
        <NetMetr>
            <h2>{_("Speed Test")}</h2>
            <div className="row">
                <div className="col-lg-3 col-sm-12">
                    <StartTestButton
                        ws={ws}
                        asyncId={asyncIdSpeedTest}
                        setAsyncId={setAsyncIdSpeedTest}
                    />
                </div>
                <div className="col-lg-9 col-sm-12">
                    <TestProgress ws={ws} asyncId={asyncIdSpeedTest} />
                </div>
            </div>
            <Results
                ws={ws}
                asyncIdRedownloadData={asyncIdRedownloadData}
                setAsyncIdRedownloadData={setAsyncIdRedownloadData}
            />
            {getSettingsState.data && (
                <LinkToMyNetmetr syncCode={getSettingsState.data.sync_code} />
            )}
        </NetMetr>
    );
}

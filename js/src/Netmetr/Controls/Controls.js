/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import "./Controls.css";
import PropTypes from "prop-types";
import RedownloadDataButton from "./RedownloadDataButton";
import StartTestButton from "./StartTestButton";

Controls.propTypes = {
    ws: PropTypes.object.isRequired,

    asyncIdSpeedTest: PropTypes.string,
    setAsyncIdSpeedTest: PropTypes.func.isRequired,

    asyncIdRedownloadData: PropTypes.string,
    setAsyncIdRedownloadData: PropTypes.func.isRequired,
};

export default function Controls({
    ws,
    asyncIdSpeedTest, setAsyncIdSpeedTest,
    asyncIdRedownloadData, setAsyncIdRedownloadData,
}) {
    return (
        <>
            <h3>{_("Controls")}</h3>
            <div className="netmetr-controls">
                <StartTestButton
                    ws={ws}
                    asyncId={asyncIdSpeedTest}
                    setAsyncId={setAsyncIdSpeedTest}
                />
                <RedownloadDataButton
                    ws={ws}
                    asyncId={asyncIdRedownloadData}
                    setAsyncId={setAsyncIdRedownloadData}
                />
            </div>
        </>
    );
}

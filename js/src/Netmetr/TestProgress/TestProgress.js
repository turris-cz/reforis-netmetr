/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import useNetmetrTest from "./hooks";
import "./TestProgress.css";

TestProgress.propTypes = {
    ws: PropTypes.object.isRequired,
    asyncId: PropTypes.string,
};

export default function TestProgress({ ws, asyncId }) {
    const [data] = useNetmetrTest(ws, asyncId);

    if (!data) return null;

    return (
        <>
            <h4 className="text-center">
                {_("Test progress")}
            </h4>
            <div className="progress">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <div
                    id="progressbar"
                    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    role="progressbar"
                    aria-valuenow={data.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${data.percent}%` }}
                >
                    {data.msg}
                </div>
            </div>
        </>
    );
}

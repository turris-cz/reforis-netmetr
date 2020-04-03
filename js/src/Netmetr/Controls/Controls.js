/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import "./Controls.css";
import RedownloadDataButton from "./RedownloadDataButton";
import StartTestButton from "./StartTestButton";
import useNetmetrTest from "../TestProgress/hooks";

export default function Controls({ ws }) {
    const [] = useNetmetrTest(ws);

    return (
        <>
            <h3>{_("Controls")}</h3>
            <div className="netmetr-controls">
                <StartTestButton />
                <RedownloadDataButton />
            </div>
        </>
    );
}

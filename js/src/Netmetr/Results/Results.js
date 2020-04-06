/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import ResultsTableWithErrorAndSpinner from "./ResultsTable";
import useNetmetrResults from "./hooks";

export default function Results({ ws, asyncId }) {
    const [data] = useNetmetrResults(ws, asyncId);
    return (
        <>
            <h3>{_("Results")}</h3>
            <ResultsTableWithErrorAndSpinner
                apiState={data.state}
                performed_tests={(data.data || {}).performed_tests}
            />
        </>
    );
}

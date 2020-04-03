/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import { useAPIGet } from "foris";

import API_URLs from "API";
import ResultsTableWithErrorAndSpinner from "./ResultsTable";

export default function Results() {
    const [getDataState, getDataRequest] = useAPIGet(API_URLs.data);
    useEffect(() => {
        getDataRequest();
    }, [getDataRequest]);

    return (
        <>
            <h3>{_("Results")}</h3>
            <ResultsTableWithErrorAndSpinner
                apiState={getDataState.state}
                performed_tests={(getDataState.data || {}).performed_tests}
            />
        </>
    );
}

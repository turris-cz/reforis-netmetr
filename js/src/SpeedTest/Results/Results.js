/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import ResultsTableWithErrorAndSpinner from "./ResultsTable";
import useNetmetrResults from "./hooks";
import RedownloadDataButton from "../ControlButtons/RedownloadDataButton";

Results.propTypes = {
    ws: PropTypes.object.isRequired,
    asyncIdRedownloadData: PropTypes.string,
    setAsyncIdRedownloadData: PropTypes.func.isRequired,
};

export default function Results({
    ws,
    asyncIdRedownloadData,
    setAsyncIdRedownloadData,
}) {
    const [data] = useNetmetrResults(ws);

    return (
        <>
            <h2>{_("Results")}</h2>
            <RedownloadDataButton
                ws={ws}
                asyncId={asyncIdRedownloadData}
                setAsyncId={setAsyncIdRedownloadData}
            />
            <ResultsTableWithErrorAndSpinner
                apiState={data.state}
                performed_tests={(data.data || {}).performed_tests}
            />
        </>
    );
}

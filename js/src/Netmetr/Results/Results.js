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

Results.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Results({ ws }) {
    const [data] = useNetmetrResults(ws);

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

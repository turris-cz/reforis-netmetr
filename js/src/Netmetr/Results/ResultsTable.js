/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { withErrorMessage, withSpinnerOnSending } from "foris";

import ResultsTableRow from "./ResultsTableRow";

function ResultsTable({ performed_tests }) {
    return (
        <table className="table text-center">
            <thead>
                <tr>
                    <th scope="col">{_("Date and Time")}</th>
                    <th scope="col">{_("Download [Mb/s]")}</th>
                    <th scope="col">{_("Upload [Mb/s]")}</th>
                    <th scope="col">{_("Ping [ms]")}</th>
                    <th scope="col">{_("Link")}</th>
                </tr>
            </thead>
            <tbody>
                {performed_tests.map((performed_test) => (
                    <ResultsTableRow
                        key={performed_test.test_uuid}
                        performed_test={performed_test}
                    />
                ))}
            </tbody>
        </table>
    );
}

const ResultsTableWithErrorAndSpinner = withSpinnerOnSending(withErrorMessage(ResultsTable));

export default ResultsTableWithErrorAndSpinner;

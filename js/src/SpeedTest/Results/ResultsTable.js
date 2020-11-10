/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { withErrorMessage, withSpinnerOnSending } from "foris";

import ResultsTableRow from "./ResultsTableRow";

ResultsTable.propTypes = {
    performed_tests: PropTypes.arrayOf(
        PropTypes.shape({
            test_uuid: PropTypes.string.isRequired,
            time: PropTypes.number.isRequired,
            speed_download: PropTypes.number.isRequired,
            speed_upload: PropTypes.number.isRequired,
            ping: PropTypes.number,
        }),
    ).isRequired,
};

function ResultsTable({ performed_tests: tests }) {
    return (
        <>
            {tests.length ? (
                <div className="table-responsive">
                    <table className="table table-hover text-center">
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
                            {tests.map((test) => (
                                <ResultsTableRow
                                    key={test.test_uuid}
                                    performed_test={test}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-muted text-center py-2">
                    {_(
                        "No tests have been performed lately. Try to start a new test or re-download data.",
                    )}
                </p>
            )}
        </>
    );
}

const ResultsTableWithErrorAndSpinner = withSpinnerOnSending(
    withErrorMessage(ResultsTable),
);

export default ResultsTableWithErrorAndSpinner;

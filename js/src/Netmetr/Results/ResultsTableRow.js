/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import moment from "moment";

export default function ResultsTableRow({ performed_test }) {
    const time = moment.unix(performed_test.time)
        .locale(ForisTranslations.locale)
        .format("l LT");

    return (
        <tr>
            <td>{time}</td>
            <td>{performed_test.speed_download}</td>
            <td>{performed_test.speed_upload}</td>
            <td>{performed_test.ping}</td>
            <td>
                <a href={`https://www.netmetr.cz/en/detail.html?${performed_test.test_uuid}`}>
                    {_("Details")}
                    &nbsp;
                    <i className="fas fa-external-link-alt" />
                </a>
            </td>
        </tr>
    );
}

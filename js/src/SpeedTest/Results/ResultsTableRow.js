/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { NETMETR_DETAIL_URL } from "../constants";

ResultsTableRow.propTypes = {
    performed_test: PropTypes.shape({
        test_uuid: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        speed_download: PropTypes.number.isRequired,
        speed_upload: PropTypes.number.isRequired,
        ping: PropTypes.number,
    }).isRequired,
};

export default function ResultsTableRow({ performed_test }) {
    const {
        time,
        speed_download: download,
        speed_upload: upload,
        ping,
        test_uuid: uuid,
    } = performed_test;
    const formatedTime = moment
        .unix(time)
        .locale(ForisTranslations.locale)
        .format("l LT");
    return (
        <tr>
            <td>{performed_test.ping || _("N/A")}</td>
            <td>{formatedTime}</td>
            <td>{download}</td>
            <td>{upload}</td>
            <td>
                <a
                    href={`${NETMETR_DETAIL_URL}?${uuid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {_("Details")}
                    <sup>
                        <i className="fas fa-external-link-alt ml-1" />
                    </sup>
                </a>
            </td>
        </tr>
    );
}

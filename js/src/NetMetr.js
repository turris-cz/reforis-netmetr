/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

NetMetr.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default function NetMetr({ children }) {
    return (
        <>
            <h1>{_("NetMetr")}</h1>
            <p>
                {_(
                    "NetMetr measures your internet parameters like upload, download and response time."
                )}
            </p>
            {children}
        </>
    );
}

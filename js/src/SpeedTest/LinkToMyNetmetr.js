/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { NETMETR_MY_URL } from "./constants";

LinkToMyNetmetr.propTypes = {
    syncCode: PropTypes.string.isRequired,
};

export default function LinkToMyNetmetr({ syncCode }) {
    return (
        <p
            dangerouslySetInnerHTML={{
                __html: _(
                    `For more information you need to enter your sync code <strong>${syncCode}</strong> <a href="${NETMETR_MY_URL}" target="_blank" rel="noopener noreferer">here<sup><i class="fas fa-external-link-alt fa-xs ml-1"></i></sup></a>.`
                ),
            }}
        />
    );
}

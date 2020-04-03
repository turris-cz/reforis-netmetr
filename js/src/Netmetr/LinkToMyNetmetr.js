/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { NETMETR_MY_URL } from "./constants";

export default function LinkToMyNetmetr({ syncCode }) {
    return (
        <p dangerouslySetInnerHTML={{
            __html:
                _(`For more information you need to enter your sync code <strong>${syncCode}</strong> <a href="${NETMETR_MY_URL}">here</a>.`),
        }}
        />
    );
}

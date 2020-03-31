/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import Netmetr from "./Netmetr/Netmetr";
import NetmetrIcon from "./Netmetr/NetmetrIcon";

const NetmetrPlugin = {
    name: _("Netmetr"),
    weight: 65,
    path: "/netmetr",
    component: Netmetr,
    icon: <NetmetrIcon />,
};

ForisPlugins.push(NetmetrPlugin);

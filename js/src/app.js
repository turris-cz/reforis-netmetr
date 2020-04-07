/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import SpeedTest from "./SpeedTest/SpeedTest";
import Settings from "./Settings/Settings";
import NetmetrIcon from "./NetmetrIcon";

const NetmetrPlugin = {
    name: _("Netmetr"),
    weight: 65,
    path: "/netmetr",
    pages: [
        {
            path: "/speed-test",
            name: _("Speed Test"),
            component: SpeedTest,
        }, {
            path: "/settings",
            name: _("Autostart Settings"),
            component: Settings,
        },
    ],
    icon: <NetmetrIcon />,
};

ForisPlugins.push(NetmetrPlugin);

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import Netmetr from "./Netmetr/Netmetr";

const NetmetrPlugin = {
    name: _("Netmetr"),
    weight: 100,
    submenuId: "netmetr",
    path: "/netmetr",
    component: Netmetr,
    icon: "cube",
};

ForisPlugins.push(NetmetrPlugin);

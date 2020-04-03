/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

// This component is workaround to pass sync_code higher from ForisForm component.
// It should be passed as ForisForm child.

import { useEffect } from "react";

export default function SyncCodeSetter({ formData, setSyncCode }) {
    useEffect(() => {
        setSyncCode(formData.sync_code);
    }, [formData.sync_code, setSyncCode]);
    return null;
}

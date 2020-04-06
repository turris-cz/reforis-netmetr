/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import { Button, useAPIPost } from "foris";

import API_URLs from "API";

export default function StartTestButton({ setAsyncId }) {
    const [triggerTestState, triggerTest] = useAPIPost(API_URLs.triggerMeasureSpeedAndDownloadData);
    useEffect(() => {
        if (triggerTestState.data && triggerTestState.data.async_id) {
            setAsyncId(triggerTestState.data.async_id);
        }
    }, [setAsyncId, triggerTestState.data]);

    return (
        <Button onClick={triggerTest}>
            {_("Start test")}
        </Button>
    );
}

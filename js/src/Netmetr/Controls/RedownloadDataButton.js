/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import { Button, useAPIPost } from "foris";

import API_URLs from "API";

export default function RedownloadDataButton({ setAsyncId }) {
    const [
        triggerDownloadDataState,
        triggerDownloadDataRequest,
    ] = useAPIPost(API_URLs.triggerDownloadData);

    useEffect(() => {
        if (triggerDownloadDataState.data && triggerDownloadDataState.data.async_id) {
            setAsyncId(triggerDownloadDataState.data.async_id);
        }
    }, [setAsyncId, triggerDownloadDataState.data]);

    return (
        <Button onClick={triggerDownloadDataRequest}>
            {_("Redownload data")}
        </Button>
    );
}

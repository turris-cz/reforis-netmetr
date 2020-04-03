/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { Button, useAPIPost } from "foris";

import API_URLs from "API";

export default function RedownloadDataButton() {
    const [
        triggerDownloadDataState,
        triggerDownloadData,
    ] = useAPIPost(API_URLs.triggerDownloadData);

    return (
        <Button onClick={triggerDownloadData}>
            {_("Redownload data")}
        </Button>
    );
}

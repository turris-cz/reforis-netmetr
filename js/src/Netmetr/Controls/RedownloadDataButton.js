/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { Button } from "foris";

import { useRedownloadData } from "./hooks";

export default function RedownloadDataButton({ ws, asyncId, setAsyncId }) {
    const [onClickHandler, isLoading] = useRedownloadData(ws, asyncId, setAsyncId);

    return (
        <Button
            className="btn-primary col-sm-12 col-lg-4 offset-lg-2 col-lg-3"
            loading={isLoading}
            disabled={isLoading}
            onClick={onClickHandler}
        >
            {_("Redownload data")}
        </Button>
    );
}

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Button } from "foris";
import "./RedownloadDataButton.css";

import { useRedownloadData } from "./hooks";

RedownloadDataButton.propTypes = {
    ws: PropTypes.object.isRequired,

    asyncId: PropTypes.string,
    setAsyncId: PropTypes.func.isRequired,
};

export default function RedownloadDataButton({ ws, asyncId, setAsyncId }) {
    const [onClickHandler, isLoading] = useRedownloadData(ws, asyncId, setAsyncId);

    return (
        <Button
            id="redownload-data-button"
            className="btn-outline-info btn-sm"
            loading={isLoading}
            disabled={isLoading}
            onClick={onClickHandler}
        >
            {_("Redownload data")}
        </Button>
    );
}

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Button } from "foris";

import "./StartTestButton.css";

import { useStartTest } from "./hooks";

StartTestButton.propTypes = {
    ws: PropTypes.object.isRequired,

    asyncId: PropTypes.string,
    setAsyncId: PropTypes.func.isRequired,
};

export default function StartTestButton({ ws, asyncId, setAsyncId }) {
    const [onClickHandler, isLoading] = useStartTest(ws, asyncId, setAsyncId);

    return (
        <Button
            id="start-test-button"
            className="btn btn-primary col-sm-12"
            loading={isLoading}
            disabled={isLoading}
            onClick={onClickHandler}
        >
            {_("Start test")}
        </Button>
    );
}

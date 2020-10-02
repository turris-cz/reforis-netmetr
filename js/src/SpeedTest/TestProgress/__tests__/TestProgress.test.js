/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, act } from "foris/testUtils/customTestRender";
import { WebSockets } from "foris";

import TestProgress from "../TestProgress";

describe("<Results />", () => {
    const webSockets = new WebSockets();
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        ({ container, asFragment, getByText } = render(
            <TestProgress ws={webSockets} asyncId={"test-async-id"} />
        ));
        firstRender = asFragment();
    });

    it("Should not be shown at the beginning.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should render component when test is started.", () => {
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                kind: "notification",
                action: "measure_and_download_data_notification",
                data: {
                    async_id: "test-async-id",
                    percent: 5,
                    msg: "ping start",
                },
            })
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should be hidden when speed test is finished.", () => {
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                kind: "notification",
                action: "measure_and_download_data_notification",
                data: {
                    async_id: "test-async-id",
                    percent: 5,
                    msg: "ping start",
                },
            })
        );
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                kind: "notification",
                action: "measure_and_download_data_finished",
                data: {
                    async_id: "test-async-id",
                    passed: true,
                },
            })
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

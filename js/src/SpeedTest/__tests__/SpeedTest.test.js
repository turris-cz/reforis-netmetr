/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { act, render, wait } from "foris/testUtils/customTestRender";
import { ALERT_TYPES, WebSockets } from "foris";
import { mockSetAlert } from "foris/testUtils/alertContextMock";

import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import SpeedTest from "../SpeedTest";
import resultsFixture from "../Results/__tests__/__fixtures__/results";

describe("<SpeedTest />", () => {
    const webSockets = new WebSockets();
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        ({ container, asFragment, getByText } = render(
            <SpeedTest ws={webSockets} />
        ));
        mockAxios.mockResponse({ data: resultsFixture });
        await wait(() => getByText("Speed Test"));
        firstRender = asFragment();
    });

    it("Should render component.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should show success alert when test is finished successfully.", async () => {
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                action: "measure_and_download_data_finished",
                data: {
                    async_id: "other ID",
                    passed: true,
                },
            })
        );
        await wait(() => {
            expect(mockSetAlert).toBeCalledWith(
                "Speed test finished successfully.",
                ALERT_TYPES.SUCCESS
            );
        });
    });

    it("Should show danger alert when test is finished unsuccessfully.", async () => {
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                action: "measure_and_download_data_finished",
                data: {
                    async_id: "other ID",
                    passed: false,
                },
            })
        );
        await wait(() => {
            expect(mockSetAlert).toBeCalledWith(
                "Speed test failed.",
                ALERT_TYPES.DANGER
            );
        });
    });
});

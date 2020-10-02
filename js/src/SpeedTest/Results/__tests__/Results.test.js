/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, wait, act, fireEvent } from "foris/testUtils/customTestRender";
import { WebSockets } from "foris";
import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import resultsFixture from "./__fixtures__/results";
import Results from "../Results";

describe("<Results />", () => {
    const webSockets = new WebSockets();
    const setAsyncId = jest.fn();
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        ({ container, asFragment, getByText } = render(
            <Results
                ws={webSockets}
                setAsyncIdRedownloadData={setAsyncId}
                asyncIdRedownloadData={"test-async-id"}
            />
        ));
        mockAxios.mockResponse({ data: resultsFixture });
        await wait(() => getByText("Date and Time"));

        firstRender = asFragment();
    });

    it("Should render component.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should redownload data when speed test is finished.", () => {
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        // Simulate receiving message from WS server.
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                action: "measure_and_download_data_finished",
                data: {
                    async_id: "test-async-id",
                    passed: true,
                },
            })
        );
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(
            2,
            "/reforis/netmetr/api/data",
            expect.anything()
        );
    });

    it("Should redownload data when redownload is finished.", () => {
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        // Simulate receiving message from WS server.
        act(() =>
            webSockets.dispatch({
                module: "netmetr",
                action: "download_data_finished",
                data: {
                    async_id: "test-async-id",
                    passed: true,
                },
            })
        );
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(
            2,
            "/reforis/netmetr/api/data",
            expect.anything()
        );
    });
});

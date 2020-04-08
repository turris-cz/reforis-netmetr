/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render, wait, act, fireEvent} from "foris/testUtils/customTestRender";
import {WebSockets} from "foris";
import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import RedownloadDataButton from '../RedownloadDataButton';

describe("<RedownloadDataButton />", () => {
    const webSockets = new WebSockets();
    const setAsyncId = jest.fn();
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        ({container, asFragment, getByText} = render(
            <RedownloadDataButton ws={webSockets} setAsyncId={setAsyncId} asyncId={"test-async-id"}/>
        ));
        await wait(() => getByText("Redownload data"));
        firstRender = asFragment();
    });

    it("Should render component.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should trigger redownload data on click.", () => {
        fireEvent.click(getByText("Redownload data"));
        expect(mockAxios.post).toBeCalled();
        expect(mockAxios.post)
            .toHaveBeenCalledWith("/reforis/netmetr/api/trigger-download-data", undefined, expect.anything());
    });

    it("Should show spinner on click.", () => {
        fireEvent.click(getByText("Redownload data"));
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should stop show spinner after WS message.", () => {
        fireEvent.click(getByText("Redownload data"));
        // Simulate receiving message from WS server.
        act(() => webSockets.dispatch({
            module: "netmetr",
            action: "download_data_finished",
            data: {
                async_id: "test-async-id",
                passed: true,
            }
        }));

        // Should be the same.
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should not react on different asyncId in WS message.", () => {
        fireEvent.click(getByText("Redownload data"));
        // Simulate receiving message from WS server.
        act(() => webSockets.dispatch({
            module: "netmetr",
            action: "download_data_finished",
            data: {
                async_id: "other ID",
                passed: true,
            }
        }));

        // Should still show spinner.
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });
});

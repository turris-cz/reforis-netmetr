/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, wait, fireEvent } from "foris/testUtils/customTestRender";
import { WebSockets } from "foris";
import diffSnapshot from "snapshot-diff";
import mockAxios from "jest-mock-axios";

import autostartFixture from "./__fixtures__/autostart";
import Settings from "../Settings";

describe("<Settings />", () => {
    let container;
    let asFragment;
    let getByText;
    let firstRender;

    beforeEach(async () => {
        const webSockets = new WebSockets();
        ({ container, asFragment, getByText } = render(
            <Settings ws={webSockets} />
        ));
        mockAxios.mockResponse({ data: autostartFixture });
        await wait(() => getByText("NetMetr"));
        firstRender = asFragment();
    });

    it("Should render component.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should disable hours when disabled.", () => {
        fireEvent.click(getByText("Enabled"));
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should change form value when disabled.", () => {
        fireEvent.click(getByText("Enabled"));
        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        const data = {
            autostart_enabled: false,
            hours_to_run: [0, 1, 2, 3, 4],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/netmetr/api/settings",
            data,
            expect.anything()
        );
    });

    it("Should enable hours.", () => {
        fireEvent.click(getByText("7:00 AM"));
        fireEvent.click(getByText("12:00 PM"));
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should change form value when new hours are selected.", () => {
        fireEvent.click(getByText("7:00 AM"));
        fireEvent.click(getByText("12:00 PM"));
        fireEvent.click(getByText("Save"));

        expect(mockAxios.post).toBeCalled();
        const data = {
            autostart_enabled: true,
            hours_to_run: [0, 1, 2, 3, 4, 7, 12],
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/netmetr/api/settings",
            data,
            expect.anything()
        );
    });
});

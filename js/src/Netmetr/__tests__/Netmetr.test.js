/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import Netmetr from "../Netmetr";

describe("<Netmetr />", () => {
    it("should render component", () => {
        const { getByText } = render(<Netmetr />);
        expect(getByText("Netmetr")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith("/reforis/netmetr/api/example", expect.anything());
    });
});

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render} from "foris/testUtils/customTestRender";

import AutostartForm from '../AutostartForm';
import autostartFixture from '../../__tests__/__fixtures__/autostart';

describe("<AutostartForm />", () => {
    it("should render component", () => {
        const setFormValue = jest.fn(() => jest.fn());
        const {getByText, container} = render(
            <AutostartForm
                formData={autostartFixture}
                setFormValue={setFormValue}
            />
        );
        expect(getByText("Autostart")).toBeDefined();
        expect(container).toMatchSnapshot();
    });
});

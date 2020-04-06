/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useState, useEffect } from "react";
import { useAlert, useWSForisModule } from "foris";

export default function useNetmetrTest(ws) {
    const [data, setData] = useState(null);
    const [setAlert] = useAlert();

    const [dataProcess] = useWSForisModule(ws, "netmetr", "measure_and_download_data_notification");
    useEffect(() => {
        if (dataProcess) {
            setData((currentData) => ({ ...currentData, ...dataProcess }));
        }
    }, [dataProcess]);

    const [dataFinished] = useWSForisModule(ws, "netmetr", "measure_and_download_data_finished");
    useEffect(() => {
        if (dataFinished) {
            setData(() => null);
        }
    }, [dataFinished, setAlert]);

    return [data];
}

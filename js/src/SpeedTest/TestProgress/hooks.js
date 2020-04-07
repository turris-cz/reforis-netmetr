/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useState, useEffect } from "react";
import { useAlert, useWSForisModule } from "foris";

export default function useNetmetrTest(ws, asyncId) {
    const [data, setData] = useState(null);
    const [setAlert] = useAlert();

    const [measureAndDownloadData] = useWSForisModule(ws, "netmetr", "measure_and_download_data_notification");
    useEffect(() => {
        if (measureAndDownloadData && measureAndDownloadData.async_id === asyncId) {
            setData((currentData) => ({ ...currentData, ...measureAndDownloadData }));
        }
    }, [asyncId, measureAndDownloadData]);

    const [measureAndDownloadDataFinished] = useWSForisModule(ws, "netmetr", "measure_and_download_data_finished");
    useEffect(() => {
        if (measureAndDownloadDataFinished && measureAndDownloadDataFinished.async_id === asyncId) {
            setData(() => null);
        }
    }, [asyncId, measureAndDownloadDataFinished, setAlert]);

    return [data];
}

/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect } from "react";
import { useAPIGet, useWSForisModule } from "foris";

import API_URLs from "API";

export default function useNetmetrResults(ws) {
    const [getDataState, getDataRequest] = useAPIGet(API_URLs.data);
    useEffect(() => {
        getDataRequest();
    }, [getDataRequest]);

    const [dataDownloadDataFinishedData] = useWSForisModule(
        ws,
        "netmetr",
        "download_data_finished"
    );
    useEffect(() => {
        if (dataDownloadDataFinishedData) {
            getDataRequest();
        }
    }, [getDataRequest, dataDownloadDataFinishedData]);

    const [measureAndDownloadDataFinishedData] = useWSForisModule(
        ws,
        "netmetr",
        "measure_and_download_data_finished"
    );
    useEffect(() => {
        if (measureAndDownloadDataFinishedData) {
            getDataRequest();
        }
    }, [getDataRequest, measureAndDownloadDataFinishedData]);

    return [getDataState];
}

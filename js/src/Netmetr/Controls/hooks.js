/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect, useState } from "react";
import { useAPIPost, useWSForisModule } from "foris";

import API_URLs from "API";

export function useStartTest(ws, asyncId, setAsyncId) {
    return useControl(
        ws,
        asyncId, setAsyncId,
        API_URLs.triggerMeasureSpeedAndDownloadData,
        "measure_and_download_data_finished",
    );
}

export function useRedownloadData(ws, asyncId, setAsyncId) {
    return useControl(
        ws,
        asyncId, setAsyncId,
        API_URLs.triggerDownloadData,
        "download_data_finished",
    );
}

function useControl(ws, asyncId, setAsyncId, apiEndpoint, action) {
    const [isLoading, setIsLoading] = useState(false);
    const [
        triggerDownloadDataState,
        triggerDownloadDataRequest,
    ] = useAPIPost(apiEndpoint);

    useEffect(() => {
        if (triggerDownloadDataState.data && triggerDownloadDataState.data.async_id) {
            setAsyncId(triggerDownloadDataState.data.async_id);
        }
    }, [setAsyncId, triggerDownloadDataState.data]);

    const [measureAndDownloadDataFinishedData] = useWSForisModule(ws, "netmetr", action);
    useEffect(() => {
        if (measureAndDownloadDataFinishedData
            && measureAndDownloadDataFinishedData.async_id === asyncId) {
            setIsLoading(false);
        }
    }, [asyncId, measureAndDownloadDataFinishedData]);

    function onClickHandler() {
        triggerDownloadDataRequest();
        setIsLoading(true);
    }

    return [onClickHandler, isLoading];
}

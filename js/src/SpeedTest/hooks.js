/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect } from "react";
import { ALERT_TYPES, useAlert, useWSForisModule } from "foris";

export default function useNetmetrAlerts(ws) {
    const [setAlert] = useAlert();

    const [downloadDataFinishedData] = useWSForisModule(ws, "netmetr", "download_data_finished");
    useEffect(() => {
        if (downloadDataFinishedData) {
            if (downloadDataFinishedData.passed) {
                setAlert(_("Data downloaded successfully."), ALERT_TYPES.SUCCESS);
            } else {
                setAlert(_("Data downloading failed."), ALERT_TYPES.DANGER);
            }
        }
    }, [downloadDataFinishedData, setAlert]);

    const [measureAndDownloadDataFinishedData] = useWSForisModule(ws, "netmetr", "measure_and_download_data_finished");
    useEffect(() => {
        if (measureAndDownloadDataFinishedData) {
            if (measureAndDownloadDataFinishedData.passed) {
                setAlert(_("Speed test finished successfully."), ALERT_TYPES.SUCCESS);
            } else {
                setAlert(_("Speed test failed."), ALERT_TYPES.DANGER);
            }
        }
    }, [measureAndDownloadDataFinishedData, setAlert]);
}

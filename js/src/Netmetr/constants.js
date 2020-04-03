/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const IS_LOCALE_CS = ForisTranslations.locale === "cs";

const NETMETR_BASE_URL = IS_LOCALE_CS ? "https://www.netmetr.cz/cs/" : "https://www.netmetr.cz/en/";

const NETMETR_MY_URL = IS_LOCALE_CS ? `${NETMETR_BASE_URL}moje.html` : `${NETMETR_BASE_URL}my.html`;
const NETMETR_DETAIL_URL = `${NETMETR_BASE_URL}detail.html`;

export { NETMETR_MY_URL, NETMETR_DETAIL_URL };

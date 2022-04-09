/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 04:01:50
 * @FilePath: \\src\\global.js
 * @Description: 全局常量
 */

import { ArgumentException } from "./global_exception";

import { History } from "./utils/history";

export const VERSION = "1.1.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const HISTORY = new History(HISTORY_SIZE);

// ---------------------------- Configuration ---------------------------------

export const {
    APP_NAME,
    INPUT_BOX_INDEX,
    HISTORY_SIZE,
    CODE_STYLE,
    SHOW_CONSOLE,
    USER_ALIAS,
} = hamibot.env;

// ---------------------------- Verify Argument ---------------------------------

export const PACKAGE_NAME = getPackageName(APP_NAME);
if (PACKAGE_NAME === null) {
    throw new ArgumentException(`No software named ${APP_NAME} was found`);
}

if (!/^\d+$/.test(INPUT_BOX_INDEX) || Number(INPUT_BOX_INDEX) < 0) {
    throw new ArgumentException("INPUT_BOX_INDEX must be a number and must be greater than or equal to 0");
}

if (!/^\d+$/.test(HISTORY_SIZE) || Number(HISTORY_SIZE) <= 0) {
    throw new ArgumentException("HISTORY_SIZE must be a number and must be greater than 0");
}

if (USER_ALIAS === null || USER_ALIAS === "") {
    USER_ALIAS = "";
} else {
    try {
        USER_ALIAS = JSON.parse(USER_ALIAS);
    } catch(err) {
        throw new ArgumentException("USER_ALIAS must be a JSON string");
    }
}


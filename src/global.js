/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-09 23:07:46
 * @FilePath: \\src\\global.js
 * @Description: 全局常量
 */

import { ArgumentException } from "./global_exception";

import { History } from "./utils/history";

export const VERSION = "1.2.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const HISTORY = new History(HISTORY_SIZE);

// ---------------------------- Input Configuration ---------------------------------

export const {
    APP_NAME,
    INPUT_BOX_INDEX,
    HISTORY_SIZE,
    CODE_STYLE,
    SHOW_CONSOLE,
} = hamibot.env;

export let {
    USER_ALIAS,
    USER_VARIABLE,
    LAUNCH_COMMAND
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

if (USER_ALIAS === undefined || USER_ALIAS.replace(/\s/g, "") === "") {
    USER_ALIAS = "";
} else {
    try {
        USER_ALIAS = JSON.parse(USER_ALIAS);
    } catch(err) {
        throw new ArgumentException("USER_ALIAS must be a JSON string");
    }
}

if (USER_VARIABLE === undefined || USER_VARIABLE.replace(/\s/g, "") === "") {
    USER_VARIABLE = "";
} else {
    try {
        USER_VARIABLE = JSON.parse(USER_VARIABLE);
    } catch(err) {
        throw new ArgumentException("USER_VARIABLE must be a JSON string");
    }
}

if (LAUNCH_COMMAND === undefined || LAUNCH_COMMAND === "") {
    LAUNCH_COMMAND = [];
} else {
    LAUNCH_COMMAND = LAUNCH_COMMAND
        .split(/;|；/)
        .map((i) => i.replace(/^\s+|\s+$/gm, ""))
        .filter(i => i !== "");
}

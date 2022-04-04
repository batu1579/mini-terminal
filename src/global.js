/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-04 21:49:28
 * @FilePath: \\src\\global.js
 * @Description: 全局常量
 */

import { ArgumentException } from "./global_exception";

import { History } from "./utils/history";

export const VERSION = "1.0.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const EVENT = events.emitter();

// ---------------------------- Configuration ---------------------------------

export const {
    HISTORY_SIZE,
    SHOW_CONSOLE,
    CODE_STYLE
} = hamibot.env;

// ---------------------------- Verify Argument ---------------------------------

if (!/^\d+$/.test(HISTORY_SIZE) || Number(HISTORY_SIZE) <= 0) {
    throw new ArgumentException("HISTORY_SIZE must be a number and must be greater than 0");
}

export const HISTORY = new History(HISTORY_SIZE);

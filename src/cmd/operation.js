/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 13:58:21
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 15:50:37
 * @FilePath: \\src\\cmd\\operation.js
 * @Description: 加载模块
 */

import { history_module } from "./module/history";
import { terminal_module } from "./module/terminal";

export const modules = {};

modules["terminal"] = terminal_module;

modules["history"] = history_module;

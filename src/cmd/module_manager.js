/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 08:32:11
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 00:14:51
 * @FilePath: \\src\\cmd\\module_manager.js
 * @Description: 根模块管理
 */
import { hamibot_module } from "./module/hamibot";
import { history_module } from "./module/history";
import { terminal_module } from "./module/terminal";
import { utils_module } from "./module/utils";

export const modules = {};

modules["terminal"] = terminal_module;

modules["history"] = history_module;

modules["hamibot"] = hamibot_module;

modules["utils"] = utils_module;

/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 11:31:52
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-09 21:51:37
 * @FilePath: \\src\\cmd\\alias.js
 * @Description: 指令别名
 */

import { USER_ALIAS } from "../global";

// [!] 所有别名不能有空格
export const alias_lookup_table = Object.assign({
    "exit": "terminal exit",
    "hide": "terminal hide",
    "clear": "terminal clear",
    "cls": "terminal clear",
    "down": "history backward",
    "up": "history forward"
}, USER_ALIAS);

/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 13:58:21
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 02:29:43
 * @FilePath: \\src\\cmd\\operation.js
 * @Description: 加载模块
 */

import { terminal_module } from "./module/terminal";

export const modules = {};


// {
//     code: 0,
//     message: "",
//     fill_command: ""
// }

export const operations = {};

// 声明不需要解析的简单操作

operations["exit"] = function() {
    return {
        code: 0,
        message: "exit"
    };
}

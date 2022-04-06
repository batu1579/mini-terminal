/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 13:58:21
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-06 17:12:00
 * @FilePath: \\src\\cmd\\operation.js
 * @Description: 指令
 */

import { VERSION } from "../global";
import { printStr } from "../utils/io";



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

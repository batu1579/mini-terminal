/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-09 23:36:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 00:07:05
 * @FilePath: \\src\\cmd\\module\\utils.js
 * @Description: 常用工具模块
 */

import { Module, Operation } from "../../lib/base_module";
import { requiredArgument } from "../../utils/argument";
import { printStr } from "../../utils/io";

let ops = {
    "echo": new Operation(
        {
            "description": "在控制台输出字符串",
            "arguments": {
                "text": "要输出的文本（如果想输出带空格的文本可以使用引号把文本括起来）",
                "end_with": "以什么符号结尾（默认为回车）"
            }
        },
        (text = requiredArgument("text"), end_with = "\n") => {
            printStr(text, end_with);
            return {
                code: 1,
                message: "print text to terminal"
            };
        }
    )
}

export const utils_module = new Module(
    {
        "description": "常用工具模块",
        "module_name": "utils"
    },
    ops
);

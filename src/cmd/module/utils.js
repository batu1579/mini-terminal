/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-09 23:36:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 15:01:15
 * @FilePath: \\src\\cmd\\module\\utils.js
 * @Description: 常用工具模块
 */

import { GLOBAL_VARIABLE } from "../../global";
import { Module, Operation } from "../../lib/base_module";
import { requiredArgument } from "../../utils/argument";
import { printStr } from "../../utils/io";

let ops = {
    "echo": new Operation(
        {
            "description": "在控制台输出字符串",
            "arguments": {
                "text": "要输出的文本，或者使用 '{{ 变量名 }}' 来显示全局变量（使用引号可以输出空格）",
                "end_with": "以什么符号结尾（默认为回车）"
            }
        },
        (text = requiredArgument("text"), end_with = "\n") => {
            text = text.replace(/{{\s?(.+?)\s?}}/g, ($1, $2) => {
                let data = GLOBAL_VARIABLE[$2]
                if (typeof data === "Array") {
                    let temp = "\n";
                    for (let i = 0; i < data.length; i++) {
                        temp += ` - ${data[i].toString()}\n`;
                    }
                    data = temp;
                } else if (typeof data === "Object") {
                    let temp = "\n";
                    for (let key in data) {
                        temp += ` ${key}: ${data[key].toString()}\n`;
                    }
                    data = temp;
                }
                return data;
            });
            printStr(text, end_with);
            return {
                code: 1,
                message: "print text to terminal"
            };
        }
    ),
    "set": new Operation(
        {
            "description": "手动设置全局变量",
            "arguments": {
                "arg_name": "要设置的全局变量名",
                "value": "要存放的值"
            }
        },
        (
            arg_name = requiredArgument("arg_name"),
            value = requiredArgument("value")
        ) => {
            GLOBAL_VARIABLE[arg_name] = value;
            return {
                code: 1,
                message: `set global variable ${arg_name}`
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

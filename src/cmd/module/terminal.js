/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 23:25:05
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 11:05:19
 * @FilePath: \\src\\cmd\\module\\terminal.js
 * @Description: 终端指令模块
 */

import { VERSION } from "../../global";
import { Module, Operation } from "../../lib/base_module";
import { clearScreen, printStr, untilInput } from "../../utils/io";

let ops = {
    "exit": new Operation(
        {
            "description": "退出终端操作，执行后会清空历史记录",
            "arguments": {}
        },
        () => {
            return {
                code: 0,
                message: "exit"
            }
        }
    ),
    "version": new Operation(
        {
            "description": "查询终端当前版本",
            "arguments": {}
        },
        () => {
            printStr(`\n${VERSION}\n`);
            return {
                code: 1,
                message: "check terminal version"
            }
        }
    ),
    "hide": new Operation(
        {
            "description": "临时隐藏终端，直到输入恢复终端指令时再重新显示",
            "arguments": {
                "clear": "隐藏前是否需要清空屏幕"
            }
        },
        (clear) => {
            if (clear === "clear") {
                clearScreen();
            }
            untilInput(/terminal show$/g, 2);
            return {
                code: 1,
                message: "display terminal"
            }
        }
    ),
    "clear": new Operation(
        {
            "description": "清空整个输入框",
            "arguments": {}
        },
        () => {
            clearScreen();
            return {
                code: 1,
                message: "clear screen"
            }
        }
    )
}

export const terminal_module = new Module(
    {
        module_name: "terminal",
        description: "终端基础操作模块"
    },
    ops
);

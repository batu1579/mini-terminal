/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-08 11:35:18
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 15:57:21
 * @FilePath: \\src\\cmd\\module\\history.js
 * @Description: 历史记录操作模块
 */

import { HISTORY } from "../../global";
import { Module, Operation } from "../../lib/base_module";
import { checkNumber } from "../../utils/argument";
import { printStr } from "../../utils/io";

let ops = {
    "forward": new Operation(
        {
            "description": "向前移动历史记录指针",
            "arguments": {
                "times": "向前移动的次数，纯数字且大于0，默认为1"
            }
        },
        (times) => {
            checkNumber(times, {"gt": 0});
            HISTORY.forward(times);
            return {
                code: 1,
                message: `move history pointer forward ${times} times`,
                fill_command: HISTORY.getData(),
                not_record: true
            };
        }
    ),
    "backward": new Operation(
        {
            "description": "向后移动历史记录指针",
            "arguments": {
                "times": "向后移动的次数，纯数字且大于0，默认为1"
            }
        },
        (times) => {
            checkNumber(times, {"gt": 0});
            HISTORY.backward(times);
            return {
                code: 1,
                message: `move history pointer backward ${times} times`,
                fill_command: HISTORY.getData(),
                not_record: true
            };
        }
    ),
    "list": new Operation(
        {
            "description": "显示目前全部的历史记录",
            "arguments": {}
        },
        () => {
            printStr(HISTORY.getAll(true));
            return {
                code: 1,
                message: "list all history record"
            };
        }
    )
}

export const history_module = new Module(
    {
        module_name: "history",
        description: "指令历史模块"
    },
    ops
);

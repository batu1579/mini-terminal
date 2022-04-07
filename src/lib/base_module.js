/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 15:00:24
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 02:44:13
 * @FilePath: \\src\\lib\\base_module.js
 * @Description: 模块基类
 */
import { getFunctionArguments, requiredArgument } from "../utils/argument";
import { printStr } from "../utils/io";
import {
    CommandNotFoundException,
    TooManyArgumentsException,
    FormatException
} from "./terminal_exception";

export class Module {
    /**
     * @param {String} 模块名称（调用时的名称）
     * @description: 模块类，用来创建新模块供操作挂载
     */
    constructor(
        module_name = requiredArgument("module_name"),
        ops = requiredArgument("ops"),
    ) {
        // 实例化模块类后调用 register 函数注册模块即可使用
        this.module_name = module_name;
        this.ops = ops;
    }

    execute(statement) {
        let pattern = /^([^\s]+)(?:\s(.+))?$/g;
        let result = pattern.exec(statement);
        if (!result) throw new FormatException();

        let operation = result[1];
        let args = result[2] ? result[2] : "";

        if (!(operation in this.ops)) {
            throw new CommandNotFoundException(`${this.module_name} ${operation}`);
        }

        return this.ops[operation].execute(args);
    }
}

export class Operation {
    /**
     * @param {Object} 操作文档
     * @param {Function} 操作核心逻辑
     * @description: 操作类，用来新建操作
     */
    constructor(
        operation_info = requiredArgument("operation_info"),
        callback = requiredArgument("callback")
    ) {
        //
        //  注意事项：
        //      1. 设置 operation_info 内容，尽可能详细的描述操作和参数。参数说明，请一定要与 core 方法严格匹配
        //              operation_info = {
        //                  "description": "balabalabala",
        //                  "arguments": {
        //                      "xxx": "wulawulawula"
        //                  }
        //              }
        //      2. callback 方法需要返回操作运行状态码
        //              state = {
        //                  "code": 1,
        //                  "message": ""
        //                  "fill_command": ""
        //              }
        //
        this.operation_info = operation_info;
        this.core = callback;
    }

    /**
     * @param {String} args 参数字符串
     * @return {Array}
     * @description: 解析参数字符串，分离单词但保留引号中的空格
     */
    parseArgs(args) {
        let pattern = /[“|”|‘|’|"|'](.+?)[“|”|‘|’|"|']|\s/g;
        return args
            .split(pattern)
            .filter(i => i !== undefined && i !== " " && i !== "");
    }

    execute(args) {
        // 解析参数
        args = this.parseArgs(args);

        let state = {
            code: 1,
            message: "show help message"
        };
        // 执行指令
        let result = this.core.apply(this, args);
        return result === null ? {code: 1} : result;
    }
}

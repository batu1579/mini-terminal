/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 22:23:14
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 01:07:02
 * @FilePath: \\src\\utils\\argument.js
 * @Description: 函数参数相关的工具方法
 */

import { FunctionException } from "../global_exception";

/**
 * @param {Function} func 要检测的函数
 * @return {Array} 形参名称
 * @description: 获取函数的全部形参
 */
export function getFunctionArguments(func) {
    if (func.length === 0) return [];
    // 获取函数形参
    let args = /[^(]+\(([^)]*)?\)/gm.exec(Function.prototype.toString.call(func))[1];
    // 分离形参
    args = args.split(/(.*?),\s?/).filter(i => i !== "");
    // 分离参数默认值
    args = args.map(i => /^(\S*)/.exec(i.replace(/^\s+|\s+$/gm,''))[1]);
    return args;
}

export function requiredArgument(argument_name) {
    let caller_name = (new Error()).stack.split("\n")[2].replace(/^\s+|\s+$/gm,'').split(" ")[1];
    throw new MissingArgumentException(argument_name, caller_name);
}

class MissingArgumentException extends FunctionException {
    constructor(argument_name, caller_name) {
        super(`argument ${argument_name} of ${caller_name} is required`);
        this.name = "MissingArgumentException";
    }
}

class ArgumentValidationError extends FunctionException {
    constructor(arguments_name, message) {
        super(`${arguments_name}`)
    }
}

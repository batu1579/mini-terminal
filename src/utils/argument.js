/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-07 22:23:14
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-08 15:33:44
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

export function toNumber(value) {
    if (isNaN(value)) {
        throw new ArgumentValidationError(
            `The parameter must be a number, not ${value}`
        );
    }
    return Number(value);
}

export function checkNumber(value, conditions) {
    let number = toNumber(value);

    if ("lt" in conditions && number >= conditions["lt"]) {
        throw new ArgumentValidationError(
            `The parameter must be less than ${conditions["lt"]}`
        );
    }

    if ("gt" in conditions && number <= conditions["gt"]) {
        throw new ArgumentValidationError(
            `The parameter must be greater than ${conditions["gt"]}`
        );
    }

    if ("le" in conditions && number > conditions["le"]) {
        throw new ArgumentValidationError(
            `The parameter must be less than or equal to ${conditions["le"]}`
        );
    }

    if ("ge" in conditions && number < conditions["ge"]) {
        throw new ArgumentValidationError(
            `The parameter must be greater than or equal to ${conditions["ge"]}`
        );
    }

    // 等于和不等于的是数组中的值
    if ("eq" in conditions && !(number in conditions["eq"])) {
        throw new ArgumentValidationError(
            `The parameter need to be equal to only these options ${conditions["eq"]}`
        );
    }

    if ("ne" in conditions && number in conditions["ne"]) {
        throw new ArgumentValidationError(
            `The parameter need to be  not equal to these options ${conditions["ne"]}`
        );
    }

    return number;
}

class ArgumentValidationError extends FunctionException {
    constructor(message) {
        super(message);
        this.name = "ArgumentValidationError";
    }
}

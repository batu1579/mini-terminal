/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-02 18:07:32
 * @FilePath: \\src\\global_exception.js
 * @Description: 全局异常类
 */
import { EVENT } from "./global"

export class BaseException extends Error {
    constructor(exception_type, message) {
        super(`[${exception_type}] ${message}`);
        this.name = 'BaseException';
    }
}

class BasePermissionException extends BaseException {
    constructor(message) {
        super("Permission Exception", message);
        this.name = "BasePermissionException";
    }
}

export class PermissionObtainingFailure extends BasePermissionException {
    constructor(permission) {
        super(permission + "obtaining failure");
        this.name = "PermissionObtainingFailure";
    }
}

export class ArgumentException extends BaseException {
    constructor(message) {
        super("Argument Exception", `${message}`);
        this.name = 'ArgumentException';
    }
}

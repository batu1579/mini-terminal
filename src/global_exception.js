/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2022-03-13 14:00:14
 * @FilePath: \\src\\global_exception.js
 * @Description: 全局异常类
 */
import { EVENT } from "./global"

export class BaseException {
    constructor(exception_type, message) {
        this.message = `[${exception_type}] ${message}`;
        EVENT.emit("ERROR", this.message);
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
        super("Argument Exception", message);
        this.name = 'Argument Exception';
    }
}

class StatementException extends BaseException {
    constructor(message) {
        super("Statement Exception", message);
        this.name = "StatementException";
    }
}

export class FormatException extends StatementException {
    constructor(message = "The statement format is incorrect.") {
        super(`${message} The format should be: <command> [<arguments>]`);
        this.name = "FormatException";
    }
}

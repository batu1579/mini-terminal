/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-09 20:03:16
 * @FilePath: \\src\\global_exception.js
 * @Description: 全局异常类
 */

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
        super(`${permission} obtaining failure`);
        this.name = "PermissionObtainingFailure";
    }
}

export class ArgumentException extends BaseException {
    constructor(message) {
        super("Argument Exception", message);
        this.name = 'ArgumentException';
    }
}

export class FunctionException extends BaseException {
    constructor(message) {
        super("Function Exception", message);
        this.name = 'FunctionException';
    }
}

class HTTPException extends BaseException {
    constructor(message) {
        super("HTTP Exception", message);
        this.name = 'HTTPException';
    }
}

export class RequestFailure extends HTTPException {
    constructor(url, state_code) {
        super(`Failed to request ${url}, state code ${state_code}`);
        this.name = 'RequestFailure';
    }
}

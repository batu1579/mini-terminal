/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 16:15:40
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 13:35:15
 * @FilePath: \\src\\lib\\terminal_exception.js
 * @Description: 终端异常
 */
import { BaseException } from '../global_exception'

class StatementException extends BaseException {
    constructor(message) {
        super("Statement Exception", message);
        this.name = "StatementException";
    }
}

export class OperationNotFoundException extends StatementException {
    constructor(command) {
        super(`${command} is not a operation or module`);
        this.name = "OperationNotFoundException";
    }
}

export class TooManyArgumentsException extends StatementException {
    constructor(current_number, expected_number) {
        super(`Too many arguments were given. Expected ${expected_number}, got ${current_number}`);
        this.name = "TooManyArgumentsException";
    }
}

export class FormatException extends StatementException {
    constructor(
        format = "<module> <operation>[ <arguments>]",
        message = "The statement format is invalid."
    ) {
        super(`${message} The format should be: ${format}`);
        this.name = "FormatException";
    }
}

/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 16:15:40
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-02 16:39:38
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

export class CommandNotFoundException extends StatementException {
    constructor(command) {
        super(`Command not found: ${command}`);
        this.name = "CommandNotFoundException";
    }
}

export class FormatException extends StatementException {
    constructor(message = "The statement format is incorrect.") {
        super(`${message} The format should be: <command> [<arguments>]`);
        this.name = "FormatException";
    }
}

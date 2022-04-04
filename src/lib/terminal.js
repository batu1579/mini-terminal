/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-21 14:52:46
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-04 22:24:25
 * @FilePath: \\src\\lib\\terminal.js
 * @Description: 监听输入
 */
import { HISTORY } from '../global';
import { state_code } from './style';
import { operations } from '../cmd/operation';
import { dont_record_list } from '../cmd/dont_record';

import { Logger } from '../utils/logger';
import { getInput, printStr } from '../utils/io';
import { CommandNotFoundException, FormatException } from './terminal_exception';

export class Terminal {
    constructor() {
        this.logger = new Logger(`Terminal`);;
    }

    launch() {
        // main loop
        let statement, result;
        let state = state_code.noerror;
        let placeholder = "";

        while (true) {
            // 获取用户输入的指令
            statement = getInput(`[ ${state} ]$ `, placeholder);
            try {
                result = this.execute(statement);
            } catch (err) {
                // 抛出异常时输出异常信息
                result = {
                    code: -1,
                    message: err.message
                }
            }
            this.logger.verbose(`statement result: ${JSON.stringify(result)}`);

            placeholder = result.fill_command ? result.fill_command : "";

            if (result.code === 1) {
                // 返回正常状态码时无操作
                state = state_code.noerror;
            } else if (result.code === -1) {
                printStr(`Error: ${result.message}`);
                state = state_code.error;
            } else if (result.code === 0) {
                // 返回关闭状态码时退出终端
                break;
            } else {
                // 返回其他状态码时显示告警信息
                printStr(!result.message ? `Error code: ${result.code}` : result.message)
                state = state_code.warn;
            }
        }
    }

    execute(statement) {
        this.logger.info(`statement detected: ${statement}`);

        // 过滤空语句
        if (statement === "") {
            return { code: 1 };
        }

        // 分解语句为（指令 + 参数）
        let result = /^([^\s]+)(?:\s(.+))?$/.exec(statement);
        if (!result) throw new FormatException();

        let command = result[1];
        let params = result[2] === undefined ? null : result[2];

        // 排除操作历史记录的两个指令
        if (dont_record_list.indexOf(command) === -1) {
            // 添加到指令历史记录
            HISTORY.push(statement);
        }

        if (command in operations) {
            // 调用指令
            return operations[command](params);
        } else throw new CommandNotFoundException(command);
    }
}

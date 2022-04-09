/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-21 14:52:46
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-09 18:10:21
 * @FilePath: \\src\\lib\\terminal.js
 * @Description: 监听输入
 */
import { HISTORY } from '../global';
import { state_code } from './style';
import { modules } from '../cmd/operation';
import { alias_lookup_table } from '../cmd/alias';

import { Logger } from '../utils/logger';
import { getInput, printStr } from '../utils/io';
import { OperationNotFoundException, FormatException } from './terminal_exception';

export class Terminal {
    constructor() {
        this.logger = new Logger(`Terminal`);
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

        // 分解语句为（模块 + 参数）
        let result = /^(\S+)(?:\s(.*))?$/g.exec(statement);
        if (!result) throw new FormatException();

        let modules_name = result[1];
        let command = result[1];
        let params = result[2] !== undefined ? result[2] : "";

        if (command in alias_lookup_table) {
            // 用预设的语句替换别名
            result = /^(\S+)(?:\s(.*))?$/g.exec(alias_lookup_table[command]);

            if (!result) throw new FormatException();

            modules_name = result[1];
            params = `${result[2]} ${params !== undefined ? params : ""}`;
        }

        if (!(modules_name in modules)) throw new OperationNotFoundException(modules_name);

        let state = modules[modules_name].execute(params.replace(/^\s+|\s+$/gm, ""));

        // 添加历史记录
        if (state.not_record !== true) {
            HISTORY.push(statement);
        }

        return state;
    }
}

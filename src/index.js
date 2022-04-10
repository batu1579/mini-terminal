/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-24 09:24:53
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 14:59:18
 * @FilePath: \\src\\index.js
 * @Description: 程序入口
 */

import { init } from './utils/init';

import { Terminal } from './lib/terminal';
import { LAUNCH_COMMAND } from './global';
import { printStr, getWidget } from './utils/io';

// 初始化
init();

// 实例化终端
let terminal = new Terminal();

// 运行所有自启动指令
for (let i = 0; i < LAUNCH_COMMAND.length; i++) {
    terminal.execute_statement(LAUNCH_COMMAND[i]);
}

// 启动主循环
terminal.launch();

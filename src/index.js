/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-24 09:24:53
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-04 22:31:33
 * @FilePath: \\src\\index.js
 * @Description: 程序入口
 */

import { init } from './utils/init';

import { Terminal } from './lib/terminal';
import { clearScreen, printStr, getWidget } from './utils/io';

// 初始化
init();

// 输入框不为空时换行
let widget = getWidget();
if (widget.text() != "") {
    printStr("");
}

// 启动终端
let terminal = new Terminal();
terminal.launch();

// 退出终端
clearScreen();
printStr(":) see you later ...");
sleep(1000);
clearScreen();

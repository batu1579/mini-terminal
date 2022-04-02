/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-02 17:02:33
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-02 17:03:34
 * @FilePath: \\src\\lib\\style.js
 * @Description: 执行状态样式
 */
import { CODE_STYLE } from '../global';

const state_code_list = {
    text: {
        noerror: "NONE",
        warn: "WARN",
        error: "ERROR"
    },
    sign: {
        noerror: "~",
        warn: "?",
        error: "!"
    },
    face: {
        noerror: ":)",
        warn: ":|",
        error: ":("
    }
}

export const state_code = state_code_list[CODE_STYLE];

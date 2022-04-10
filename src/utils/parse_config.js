/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-10 13:25:33
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 13:35:44
 * @FilePath: \\src\\utils\\parse_config.js
 * @Description: 解析配置字符串为JSON
 */

import { FormatException } from "../lib/terminal_exception";

export function parse_config(text) {
    let data = {};
    let result;

    text = text
        .split(/;|；/)
        .map((i) => i.replace(/^\s+|\s+$/gm, ""))
        .filter(i => i !== "");

    for (let i = 0; i < text.length; i++) {
        result = /^(.*)[:|：]\s?(.*)$/.exec(text[i]);
        if (!result) throw new FormatException("<key>: <value>;", "The configuration format is invalid.");
        data[result[1]] = result[2];
    };
    return data;
}

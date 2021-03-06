/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-21 14:58:40
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-09 17:25:30
 * @FilePath: \\src\\utils\\io.js
 * @Description: 模拟输入输出函数
 */

import { PACKAGE_NAME, INPUT_BOX_INDEX } from "../global";

/**
 * @param {Number} line_number 要删除的行数（从1开始计数）
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @description: 删除文本框中的最后几行
 */
export function delete_lines(
    line_number = 1,
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    let widget = getWidget(input_box_index, package_name);
    printStr(
        widget.text()
            .split("\n")
            .slice(0, line_number * -1)
            .join("\n")
    );
}

/**
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @return {Boolean} 是否清除成功
 * @description: 清空输入框的全部文本
 */
export function clearScreen(
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    getWidget(input_box_index, package_name);
    if (setText(input_box_index, "")) {
        return getWidget(input_box_index, package_name).text() === "";
    } else {
        return false;
    }
}

/**
 * @param {RegExp} pattern 用来匹配的正则表达式
 * @param {Number} match_lines 要匹配倒数第几行(从1开始，默认为1)
 * @param {Boolean} to_new_line 是否在匹配到文本之后换行
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @description: 阻塞直到输入框中倒数指定行出现匹配的文本
 */
export function untilInput(
    pattern,
    match_lines = 1,
    to_new_line = true,
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    let result = null;
    while (result === null) {
        let widget = getWidget(input_box_index, package_name);
        let lines = widget.text().split("\n");
        result = pattern.exec(lines[lines.length - match_lines]);
        // 防止查找过于频繁
        sleep(200);
    }
    if (to_new_line) printStr("");
}

/**
 * @param {String} msg 提示信息（不能为空，使用英文符号时需要转义）
 * @param {String} extra_str 额外的附加信息（可以手动删除不影响匹配）
 * @param {String} end_sign 结束标记，当输入框中最后一行等于结束标记时返回输入内容（默认为零宽回车）
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @return {String} 用户输入的数据
 * @description: 显示提示信息并获取用户输入
 */
export function getInput(
    msg = ">",
    extra_str = "",
    end_sign = "\u200b",
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    // 输出提示信息
    printStr(`${msg}${extra_str}`, "", input_box_index);

    // 转义信息中的正则元字符
    msg = msg
        .replace(/\\/, "\\\\")
        .replace(/\(/, "\\(")
        .replace(/\)/, "\\)")
        .replace(/\[/, "\\[")
        .replace(/\]/, "\\]")
        .replace(/\{/, "\\{")
        .replace(/\}/, "\\}")
        .replace(/\./, "\\.}")
        .replace(/\+/, "\\+")
        .replace(/\*/, "\\*")
        .replace(/\?/, "\\?")
        .replace(/\|/, "\\|")
        .replace(/\$/, "\\$")
        .replace(/\^/, "\\^");

    let pattern = new RegExp(`(?:${msg}\s?)((?:(?!${msg}).|\n)*?)(?=\s?${end_sign}$)`, "g");

    // 等待输入
    while (true) {
        let widget = getWidget(input_box_index, package_name);
        let lines = widget
            .text()
            .split("\n");
        if (lines[lines.length - 1] === end_sign) {
            let result = pattern.exec(widget.text());
            if (result) {
                return result[1].slice(0, -1 * end_sign.length);
            }
        }
        // 防止查找过于频繁
        sleep(200);
    }
}

/**
 * @param {Array} array 数据数组，每个元素需要是字符串，如果不是会调用 toString 方法来转换
 * @param {String} template 每行模板，通过 {{ data }} 来标记要填充数据的位置
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @description: 
 */
export function printList(
    array,
    template = " - {{ data }}",
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    let data = "";
    for (let i = 0; i < array.length; i++) {
        data = array[i].toString();
        printStr(
            template.replace(/\{\{.*?\}\}/g, data),
            "\n",
            input_box_index,
            package_name
        );
    }
}

/**
 * @param {String} msg 要打印的信息
 * @param {String} end_with 信息的结尾（默认换行符结尾）
 * @param {Number} input_box_index 输入框索引，用来定位输入框
 * @param {String} package_name 要检测的软件包名
 * @return {Boolean} 输入是否成功
 * @description: 用来在输入框末尾添加字符串
 */
export function printStr(
    msg,
    end_with = "\n",
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    getWidget(input_box_index, package_name);
    // 向输入框最后添加
    return input(input_box_index, `${msg}${end_with}`);
}

/**
 * @param {Number} input_box_index 屏幕上输入框的索引值
 * @param {String} package_name 要检测的软件包名
 * @return {UiObject} 输入框控件
 * @description: 阻塞直到成功获取输入框
 */
export function getWidget(
    input_box_index = INPUT_BOX_INDEX,
    package_name = PACKAGE_NAME
) {
    while (true) {
        let collection = className("EditText")
            .packageName(package_name)
            .untilFind();
        if (collection.length >= input_box_index) {
            return collection[input_box_index];
        }
    }
}

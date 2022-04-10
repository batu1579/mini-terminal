/*
 * @Author: BATU1579
 * @CreateDate: 2022-04-08 11:33:45
 * @LastEditor: BATU1579
 * @LastTime: 2022-04-10 14:01:17
 * @FilePath: \\src\\cmd\\module\\hamibot.js
 * @Description: 远程操作hamibot的模块
 */

import { GLOBAL_VARIABLE } from "../../global";
import { ArgumentException, RequestFailure } from "../../global_exception";
import { Module, Operation } from "../../lib/base_module";
import { requiredArgument } from "../../utils/argument";
import { printStr } from "../../utils/io";

class InvalidToken extends ArgumentException {
    constructor() {
        super(`The token is invalid, it should be starting with "hmp_"`);
        this.name = "InvalidToken";
    }
}

class EmptyToken extends ArgumentException {
    constructor() {
        super("\
            This operation needs to set token first.\
            Use \"hamibot set-token <TOKEN>\" to set the token\
        ");
        this.name = "EmptyToken";
    }
}

function requestToHamibot(
    path,
    token = GLOBAL_VARIABLE["HAMI_TOKEN"],
    method = "GET",
    data = {}
) {

    if (GLOBAL_VARIABLE["HAMI_TOKEN"] === "") {
        throw new EmptyToken();
    } else if (/^hmp\_/.exec(GLOBAL_VARIABLE["HAMI_TOKEN"]) === null) {
        throw new InvalidToken();
    }

    let URL = `https://api.hamibot.com${path}`
    let res = http.request(
        URL,
        {
            "method": method,
            "headers": {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json",
                "body": data
            }
        }
    )
    if (res.statusCode !== 200) throw new RequestFailure(URL, res.statusCode);
    return res.body.json();
}

let robot_ops = {
    "list": new Operation(
        {
            "description": "显示全部机器人列表",
            "arguments": {
                "show_full_info": "显示详细信息（设置为'all'时显示全部信息否则只显示名称）",
                "token": "指定调用时使用的令牌，可以使用 'hamibot set-token <token>' 指令提前设置"
            }
        },
        (show_full_info = "", token = GLOBAL_VARIABLE["HAMI_TOKEN"]) => {
            let data = requestToHamibot('/v1/robots', token)["items"];
            let robot_list = {};
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (show_full_info === "all") {
                    printStr(` -
  名称: ${item.name}
  标签：${item.tags.toString()}
  状态：${item.online ? '在线' : '离线'}
  机型：${item.model}
   ID : ${item._id}
                    `);
                } else {
                    printStr(` -\n  ${item.name}: ${item._id}`);
                }
                robot_list[item.name] = item._id;
            }
            GLOBAL_VARIABLE["ROBOT_LIST"] = robot_list;
            return {
                code: 1,
                message: "show robot list"
            };
        }
    ),
    "stop": new Operation(
        {
            "description": "停止指定机器人正在运行的全部脚本",
            "arguments": {
                "mode": "查找模式，可选值为 '-id' 或 '-name'",
                "value": "mode 为 -id 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）",
                "token": "指定调用时使用的令牌，可以使用 'hamibot set-token <token>' 指令提前设置"
            }
        },
        (
            mode = requiredArgument("mode"),
            value = requiredArgument("value"),
            token = GLOBAL_VARIABLE["HAMI_TOKEN"]
        ) => {
            if (mode === "-name") {
                let robot_id = GLOBAL_VARIABLE["ROBOT_LIST"][value];
                if (!robot_id) throw new ArgumentException(`No robot named ${value} is found.`);
                value = robot_id;
            }
            requestToHamibot(`/v1/robots/${value}/stop`, token, "DELETE");
            return {
                code: 1,
                message: `stop robot ${value}`
            };
        }
    )
};

let script_ops = {
    "list": new Operation(
        {
            "description": "显示全部脚本列表",
            "arguments": {
                "dev": "可选值为 '-d' 或 '-u' 可选。如果为 '-d' 则会尝试获取开发中的脚本",
                "token": "指定调用时使用的令牌，可以使用 'hamibot set-token <token>' 指令提前设置"
            }
        },
        (
            dev = "-u",
            token = GLOBAL_VARIABLE["HAMI_TOKEN"]
        ) => {
            let data = requestToHamibot(`/v1/${dev == "-d" ? "dev" : ""}scripts`, token)["items"];
            let script_list = {}
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                printStr(`-
  名称：${item.name}
  版本：${item.version}
   ID ：${item._id}
                `);
                script_list[item.name] = item._id;
            }
            GLOBAL_VARIABLE["SCRIPT_LIST"] = script_list;
            return {
                code: 1,
                message: "show script list"
            };
        }
    ),
    "run": new Operation(
        {
            "description": "运行脚本",
            "arguments": {
                "dev": "可选值为 '-d' 或 '-u' 可选。如果为 '-d' 则会尝试获取开发中的脚本",
                "r_mode": "查找机器人的模式，可选值为 '-id' 或 '-name'",
                "r_value": "mode 为 -id 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）",
                "s_mode": "查找脚本的模式，可选值为 '-id' 或 '-name'",
                "s_value": "mode 为 -id 时为脚本的 ID ，否则为脚本的名称（名称模式必须曾经通过指令获取过脚本列表）",
                "token": "指定调用时使用的令牌，可以使用 'hamibot set-token <token>' 指令提前设置"
            }
        },
        (
            dev = requiredArgument("dev"),
            r_mode = requiredArgument("r_mode"),
            r_value = requiredArgument("r_value"),
            s_mode = requiredArgument("s_mode"),
            s_value = requiredArgument("s_value"),
            token = GLOBAL_VARIABLE["HAMI_TOKEN"]
        ) => {
            if (r_mode === "-name") {
                let robot_id = GLOBAL_VARIABLE["ROBOT_LIST"][r_value];
                if (!robot_id) throw new ArgumentException(`No robot named ${r_value} is found.`);
                r_value = robot_id;
            }
            if (s_mode === "-name") {
                let script_id = GLOBAL_VARIABLE["ROBOT_LIST"][s_value];
                if (!script_id) throw new ArgumentException(`No robot named ${s_value} is found.`);
                s_value = script_id;
            }
            requestToHamibot(
                `/v1/${dev == "-d" ? "dev" : ""}scripts/${s_value}/run`,
                token,
                "POST",
                {
                    "robots": [
                        {
                            "_id": r_value
                        }
                    ]
                }
            );
            return {
                code: 1,
                message: `Let robot ${r_value} run ${s_value} script`
            };
        }
    ),
    "stop": new Operation(
        {
            "description": "停止指定机器人正在运行的指定脚本",
            "arguments": {
                "dev": "可选值为 '-d' 或 '-u' 可选。如果为 '-d' 则会尝试获取开发中的脚本",
                "r_mode": "查找机器人的模式，可选值为 '-id' 或 '-name'",
                "r_value": "mode 为 -id 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）",
                "s_mode": "查找脚本的模式，可选值为 '-id' 或 '-name'",
                "s_value": "mode 为 -id 时为脚本的 ID ，否则为脚本的名称（名称模式必须曾经通过指令获取过脚本列表）",
                "token": "指定调用时使用的令牌，可以使用 'hamibot set-token <token>' 指令提前设置"
            }
        },
        (
            dev = requiredArgument("dev"),
            r_mode = requiredArgument("r_mode"),
            r_value = requiredArgument("r_value"),
            s_mode = requiredArgument("s_mode"),
            s_value = requiredArgument("s_value"),
            token = GLOBAL_VARIABLE["HAMI_TOKEN"]
        ) => {
            if (r_mode === "-name") {
                let robot_id = GLOBAL_VARIABLE["ROBOT_LIST"][r_value];
                if (!robot_id) throw new ArgumentException(`No robot named ${r_value} is found.`);
                r_value = robot_id;
            }
            if (s_mode === "-name") {
                let script_id = GLOBAL_VARIABLE["ROBOT_LIST"][s_value];
                if (!script_id) throw new ArgumentException(`No robot named ${s_value} is found.`);
                s_value = script_id;
            }
            requestToHamibot(
                `/v1/${dev == "-d" ? "dev" : ""}scripts/${s_value}/run`,
                token,
                "DELETE",
                {
                    "robots": [
                        {
                            "_id": r_value
                        }
                    ]
                }
            );
            return {
                code: 1,
                message: `stop robot ${r_value} run ${s_value} script`
            };
        }
    )
};

let hamibot_ops = {
    "set-token": new Operation(
        {
            "description": "设置 hamibot API 的令牌，在使用其他指令前设置可以不用每次都",
            "arguments": {
                "token": "\
                    API 令牌，一个 hmp 开头的字符串，用来在请求时验证身份。\
                    可以在设置中创建 https://hamibot.com/account/tokens\
                "
            }
        },
        (token = requiredArgument("token")) => {
            GLOBAL_VARIABLE["HAMI_TOKEN"] = token;
            return {
                code: 1,
                message: "set hamibot API token"
            };
        }
    ),
    "robot": new Module(
        {
            "description": "机器人操作模块",
            "module_name": "robot",
        },
        robot_ops
    ),
    "script": new Module(
        {
            "description": "脚本操作模块",
            "module_name": "script",
        },
        script_ops
    )
};

export const hamibot_module = new Module(
    {
        "description": "hamibot 操作模块，使用 hamibot 开放的 API",
        "module_name": "hamibot",
    },
    hamibot_ops
);

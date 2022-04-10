# `Hamibot` 模块

`hamibot` 模块有两个子模块，`robot` 和 `script`

## `hamibot set-token <token>`

-   功能： 设置请求 API 时携带的令牌，和 `set HAMI_TOKEN <token>` 指令等价
-   使用的变量： `HAMI_TOKEN`
-   参数：
    -   `token` ： API 令牌，一个 `hmp` 开头的字符串，用来在请求时验证身份。可以在设置中[创建](https://hamibot.com/account/tokens)

## `hamibot robot list[ show_full_info[ token]]`

-   功能： 显示全部机器人列表
-   使用的变量： `HAMI_TOKEN` 、 `ROBOT_LIST`
-   参数：
    -   `show_full_info` ： 显示详细信息（设置为`all`时显示全部信息否则只显示名称和 ID ）
    -   `token` ： 指定调用时使用的令牌，可以使用 `hamibot set-token <token>` 指令提前设置

## `hamibot robot stop <mode> <value>[ token]`

-   功能： 停止指定机器人正在运行的全部脚本
-   使用的变量： `HAMI_TOKEN` 、 `ROBOT_LIST`
-   参数：
    -   `mode` ：查找模式，可选值为 `-id` 或 `-name`
    -   `value` ： mode 为 -id 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）
    -   `token` ： API 令牌，一个 `hmp` 开头的字符串，用来在请求时验证身份。可以在设置中[创建](https://hamibot.com/account/tokens)

## `hamibot script list[ dev[ token]]`

-   功能： 显示全部脚本列表
-   使用的变量： `HAMI_TOKEN` 、 `SCRIPT_LIST`
-   参数：
    -   `dev` ：可选值为 `-d` 或 `-u` 可选。如果为 `-d` 则会尝试获取开发中的脚本
    -   `token` ： API 令牌，一个 `hmp` 开头的字符串，用来在请求时验证身份。可以在设置中[创建](https://hamibot.com/account/tokens)

## `hamibot script run <dev> <r_mode> <r_value> <s_mode> <s_value>[ token]`

-   功能： 运行脚本
-   使用的变量： `HAMI_TOKEN` 、 `SCRIPT_LIST` 、 `ROBOT_LIST`
-   参数：
    -   `dev` ：可选值为 `-d` 或 `-u` 可选。如果为 `-d` 则会尝试获取开发中的脚本
    -   `r_mode` ： 查找机器人的模式，可选值为 `-id` 或 `-name`
    -   `r_value` ： mode 为 `-id` 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）
    -   `s_mode` ： 查找脚本的模式，可选值为 `-id` 或 `-name`
    -   `s_value` ： mode 为 `-id` 时为脚本的 ID ，否则为脚本的名称（名称模式必须曾经通过指令获取过脚本列表）
    -   `token` ： API 令牌，一个 `hmp` 开头的字符串，用来在请求时验证身份。可以在设置中[创建](https://hamibot.com/account/tokens)

## `hamibot script stop <dev> <r_mode> <r_value> <s_mode> <s_value>[ token]`

-   功能： 停止指定机器人正在运行的指定脚本
-   使用的变量： `HAMI_TOKEN` 、 `SCRIPT_LIST` 、 `ROBOT_LIST`
-   参数：
    -   `dev` ：可选值为 `-d` 或 `-u` 可选。如果为 `-d` 则会尝试获取开发中的脚本
    -   `r_mode` ： 查找机器人的模式，可选值为 `-id` 或 `-name`
    -   `r_value` ： mode 为 `-id` 时为机器人的 ID ，否则为机器人的名称（名称模式必须曾经通过指令获取过机器人列表）
    -   `s_mode` ： 查找脚本的模式，可选值为 `-id` 或 `-name`
    -   `s_value` ： mode 为 `-id` 时为脚本的 ID ，否则为脚本的名称（名称模式必须曾经通过指令获取过脚本列表）
    -   `token` ： API 令牌，一个 `hmp` 开头的字符串，用来在请求时验证身份。可以在设置中[创建](

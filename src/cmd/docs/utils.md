# `utils` 模块

## `utils echo <text>[ end_with]`

-   功能： 向控制台输出信息或全局变量
-   别名： `echo`
-   参数：
    -   `text` ： 要输出的文本，或者使用 '{{ 变量名 }}' 来显示全局变量（使用引号可以输出空格）
    -   `end_with` ： 输出以什么符号结尾（默认为回车）

## `utils set <arg_name> <value>`

-   功能： 设置全局变量
-   别名： `set`
-   参数：
    -   `arg_name` ： 要设置的全局变量名
    -   `value` ： 要存放的值
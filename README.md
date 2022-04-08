# 迷你终端

这是一个使用输入框作为载体的模拟终端，理论上它可以在手机上任何不会被其他软件干扰的输入框中使用。写这个的目的是希望能够使用类似终端指令的方式完成一些自动化操作，同时这个迷你终端也是微信加密消息的前置。目前这个终端是单线程的，我自己对于用 `auto.js` 的多线程开发并不熟悉，也许以后等我自己搞懂了（或者碰到一个愿意帮我的大佬）会改成多线程来提高效率甚至改成同时可以开启多个终端。如果使用中有BUG或者有好的想法可以提交 [议题](https://hamibot.com/dashboard/issues/create?slug=PDL4J) 或者在仓库中提交 [issue](https://github.com/batu1579/mini-terminal/issues/new) 再或者可以直接给我发消息，我的微信号和 `GitHub` 用户名一样。欢迎大大们帮我提建议或者交流~！

>   `Hamibot` 要审核才能发布所以会比 `Github` 更新频率低一些

## 使用方法

1. 在 `Hamibot` 的插件市场安装： [传送门](https://hamibot.com/marketplace/PDL4J)
2. 打开你指定的应用，在对应输入框中会显示终端
3. 输入语句，回车执行（不是发送！！！）

> 注意：
>
> 1.   请勿删除掉终端命令行 `$` 符号及以前的字符，否则可能会导致终端无法运行。
> 2.   发现有命令不会使用，可以输入 `<模块> <操作> --help` 来输出完整的帮助信息，也可以在不了解用处的参数后面加 `-h` 来获取单独的参数描述

## 可用指令

> 现在刚刚开始，指令非常之少，以后会慢慢添加的

### terminal 模块

-   `terminal clear` ：
    -   功能： 用来清空屏幕
    -   别名： `clear`
-   `terminal exit` ：
    -   功能： 用来正常推出终端
    -   别名： `exit`
-   `terminal hide[ clear]` ：
    -   功能： 暂时隐藏终端（阻塞），直到输入唤醒指令 `terminal show` 时才重新显示
    -   别名： `hide`
    -   参数
        -   `clear` ：输入参数 `clear` 则会在隐藏终端之前清空屏幕

## 自定义别名

可以方便的添加别名，只需要在 `src\cmd\alias.js` 文件中的 `alias_lookup_table` 对象中添加新的记录即可

>   注意：
>
>   	1. 别名的优先级高于所有指令，所以添加前请确保不会覆盖某些模块
>   	1. 别名中不能包含任何空格，否则不会生效
>   	1. 使用别名时可以在后面添加参数，参数由对应的操作负责解析

## 自定义指令

我把指令分解为两种模型，一种是不负责执行只是用来规划路径的叫做模块（ `Module` ），另一种是真正负责执行动作的叫做操作（ `Operation` ）。目前 `mini-terminal` 的所有指令都需要挂载到模块上才能被调用，而模块又需要挂载到 `operations` 对象上才能生效。你可以把模块想象成文件夹，指令就是其中的软件。一个空的文件夹什么都做不了。文件也没法独立于文件夹（盘符）存在，两者缺一不可。另外，就像电脑的文件夹一样，模块也可以嵌套，嵌套模块可以十分精细的分割功能，而不用把所有功能一股脑放进一个操作当中。

### 存放位置

我建议每个模块都分别存储在 `src\cmd\module` 文件夹下的不同文件当中，彼此独立不会互相干扰。如果有更复杂的结构则可以专门新建一个文件夹来存放模块。

### 构造操作和模块

在刚新建的文件中引入 `src\lib\base_module.js` 文件中的 `Module` 和 `Operation` 类。先声明一个对象用来存储操作。然后开始向其中添加操作，大概的格式类似这样：

```js
let ops = {
    "exit": new Operation(
        {
            "description": "退出终端操作，执行后会清空历史记录",
            "arguments": {}
        },
        () => {
            return {
                code: 0,
                message: "exit"
            }
        }
    )
}
```

>   注意： `operation_info` 参数的两个字段都是必填的，哪怕 `core` 函数没有参数也需要填上。

键名为调用时的操作名。对应的值是一个实例化的 `Operation` 对象，需要传入两个参数。其一是操作的描述文档，用于输出帮助信息，其二是操作的核心逻辑，是一个回调函数。

`operation_info` 中的信息要尽可能详细的描述操作的作用和参数的用法，并且 `arguments` 中的键一定要与 `core` 方法的参数严格匹配，至少要做到每一个参数名都在里面，防止在调取参数说明时出现问题。

`core` 方法需要返回一个对象，其中可以包含三个键：

1. `code` ：[必填] 指令的运行状态码，可以是任何整数，但是只有下面几个有实际含义：

    | 状态码 | 类型       | 含义                                                         |
    | ------ | ---------- | ------------------------------------------------------------ |
    | 1      | 正常状态码 | 指令运行完成                                                 |
    | 0      | 退出状态码 | 运行完指令就退出终端                                         |
    | -1     | 异常状态码 | 指令运行出错，这个建议通过抛出异常产生，但是也可以通过函数返回 |
    | 其他   | 告警状态码 | 指令运行过程中出现问题，但是不影响执行到结束                 |

2. `message` ： 用来传递说明信息方便快速定位问题位置，一般建议尽量返回有意义的信息，利于使用过程中发现问题修改指令，只有在返回异常状态码或者告警状态码时会显示。另外返回异常状态码时会从捕获的异常中获取说明信息，返回告警状态码时如果没有返回的说明信息会输出告警状态码本身。

3.  `fill_command` ： 用来填充下一次输入的指令，一般只有操作历史或者自动生成指令的时候会用到。

### 挂载根模块

想要让根模块生效，就需要将其挂载在 `src\cmd\operation.js` 中的 `operations` 对象上，用 `terminal` 模块来举例：

```js
modules["terminal"] = terminal_module;
```

这其中键名为 `terminal` 表示在调用时的名称，而 `terminal_module` 则是从外部导入的模块对象。

## TODO List

- [x] 参数解析方法
- [ ] 基础历史指令操作
- [x] 隐藏和显示终端指令
- [x] 别名替换
- [x] 指令帮助

## 贡献者

欢迎感兴趣的大佬来和我一起完善这个小玩意~！

## 开源协议

[MPL-2.0 License](https://github.com/batu1579/mini-terminal/blob/master/LICENSE) © BATU1579
/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 20:58:39
 * @LastEditor: BATU1579
 * @LastTime: 2022-03-20 15:36:43
 * @FilePath: \\src\\utils\\init.js
 * @Description: 脚本初始化
 */
import { SHORT_WAIT_MS, VERSION, SHOW_CONSOLE } from "../global";

import { Logger } from "./logger";

import { PermissionObtainingFailure } from "../global_exception";

export function init() {
    let logger = new Logger("init");

    logger.info('Launching...');
    logger.info(`current version: ${VERSION}`);
    events.on("exit", () => { logger.info("Exit"); });

    // check accessibility permission
    if (auto.service === null) {
        if (!confirm('Please enable accessibility permission')) {
            throw new PermissionObtainingFailure("accessibility permission");
        }
        auto.waitFor();
    } else {
        logger.verbose("Access permissions enabled");
    }

    // check is service alive
    if (device.height === 0 || device.width === 0) {
        logger.error(
            'Failed to get the screen size. ' +
            'Please try restarting the service or re-installing Hamibot'
        );
        exit();
    } else {
        logger.verbose("Screen size: " + device.height + "x" + device.width);
    }

    // show console
    if (SHOW_CONSOLE != null ? SHOW_CONSOLE : false) {
        console.show();
        sleep(SHORT_WAIT_MS);
        console.setPosition(0, 100);
        console.setSize(device.width, device.height / 4);
    }

    setScreenMetrics(1080, 2400);
}

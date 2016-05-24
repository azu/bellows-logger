"use strict";
const LoggerNode = require("bellows-logger").LoggerNode;
export default class ConsoleNode extends LoggerNode {
    process(chunk, next) {
        console.log("\u{1F4BE} Log:", chunk);
        next(chunk);
    }
}

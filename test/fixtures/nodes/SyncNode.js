"use strict";
import LoggerNode from "../../../src/node/LoggerNode";
export default class SyncNode extends LoggerNode {
    process(chunk, next) {
        next(chunk);
    }
}
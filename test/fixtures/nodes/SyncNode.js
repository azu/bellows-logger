"use strict";
import LoggerNode from "../../../src/nodes/LoggerNode";
export default class SyncNode extends LoggerNode {
    process(chunk, next) {
        next(chunk);
    }
}
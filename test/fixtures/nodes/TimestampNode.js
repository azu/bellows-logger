"use strict";
import LoggerNode from "../../../src/nodes/LoggerNode";
/**
 * attach timestamp data
 */
export default class TimestampNode extends LoggerNode {
    process(chunk, next) {
        if (chunk.timestamp === undefined) {
            chunk.timestamp = Date.now();
        }
        next(chunk);
    }
}
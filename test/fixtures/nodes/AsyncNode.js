"use strict";
import LoggerNode from "../../../src/nodes/LoggerNode";
export default class AsyncNode extends LoggerNode {
    process(chunk, next) {
        setTimeout(() => {
            next(chunk);
        }, 0);
    }
}
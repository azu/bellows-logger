"use strict";
import LoggerNode from "../../../src/node/LoggerNode";
export default class ASyncNode extends LoggerNode {
    process(chunk, next) {
        setTimeout(() => {
            next(chunk);
        }, 0);
    }
}
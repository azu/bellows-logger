"use strict";
import LoggerNode from "../../../src/nodes/LoggerNode";
export default class ConsoleNode extends LoggerNode {
    process(chunk, next) {
        const parentNodeName = this.parentNode.name || "<anonymous>";
        console.log(" => " + parentNodeName + " => ", chunk);
        next(chunk);
    }
}
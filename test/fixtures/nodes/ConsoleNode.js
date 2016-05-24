"use strict";
import DestinationNode from "../../../src/nodes/DestinationNode";
export default class ConsoleNode extends DestinationNode {
    process(chunk, next) {
        const parentNodeName = this.parentNode.name || "<anonymous>";
        console.log(" => " + parentNodeName + " => ", chunk);
        next(chunk);
    }
}
// LICENSE : MIT
"use strict";
import LoggerNode from "./LoggerNode";
/**
 * DestinationNode is end point of the pipeline.
 * Not support `connect()`
 */
export default class DestinationNode extends LoggerNode {
    connect() {
        throw new Error("DestinationNode not support #connect()");
    }
}
// LICENSE : MIT
"use strict";
import LoggerNode from "./LoggerNode";
export default class DestinationNode extends LoggerNode {
    connect() {
        throw new Error("DestinationNode not support #connect()");
    }
}
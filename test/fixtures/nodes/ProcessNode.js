"use strict";
import LoggerNode from "../../../src/nodes/LoggerNode";
export default function createProcessNode(work) {
    class ProcessNode extends LoggerNode {
        process(chunk, next) {
            console.log(chunk, next);
            work(chunk, next);
        }
    }
    return new ProcessNode();
}
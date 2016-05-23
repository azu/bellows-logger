// LICENSE : MIT
"use strict";
import LoggerNode from "./LoggerNode";
/**
 * SourceNode is input source of the pipeline.
 */
export default class SourceNode extends LoggerNode {
    // nope
    process(chunk, next) {
        next(chunk);
    }
}
// LICENSE : MIT
"use strict";
const assert = require("assert");
const querystring = require("querystring");
import LoggerNode from "../../../src/nodes/LoggerNode";
export default class QueryNode extends LoggerNode {
    process(chunk, next) {
        assert(typeof chunk === "object", "chunk should be Object");
        next(querystring.stringify(chunk));
    }
}

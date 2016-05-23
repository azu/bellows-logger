// LICENSE : MIT
"use strict";
const assert = require("assert");
const querystring = require("querystring");
import LoggerNode from "./LoggerNode";
export default class QueryNode extends LoggerNode {
    process(chunk) {
        assert(typeof chunk === "object", "chunk should be Object");
        return querystring.stringify(chunk);
    }
}

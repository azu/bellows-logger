"use strict";
// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Logger from "../src/Logger";
import LoggerNode from "../src/nodes/LoggerNode";
import createProcess from "./fixtures/nodes/ProcessNode";
import ConsoleNode from "./fixtures/nodes/ConsoleNode";
import TimestampNode from "./fixtures/nodes/TimestampNode";
describe("TimestampNode", function () {
    it("should add `t` property to log data", function (done) {
        const logger = new Logger();
        const sourceNode = logger.context.createSourceNode();
        const timestampNode = new TimestampNode();
        const expectedChunk = {data: 1};
        sourceNode.connect(timestampNode).connect(createProcess((chunk, next) => {
            assert(typeof chunk.timestamp === "number");
            done();
        }));
        logger.start();
        // log after start
        logger.log(expectedChunk);
    });
});
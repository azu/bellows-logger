// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Logger from "../src/Logger";
import LoggerNode from "../src/nodes/LoggerNode";
import QueryNode from "./fixtures/nodes/QueryNode";
import SyncNode from "./fixtures/nodes/SyncNode";
import AsyncNode from "./fixtures/nodes/AsyncNode";
import createProcess from "./fixtures/nodes/ProcessNode";
import ConsoleNode from "./fixtures/nodes/ConsoleNode";
class TransformNode extends LoggerNode {
    process(chunk, next) {
        chunk.name = "HAL";
        next(chunk);
    }
}
describe("Logger", function () {
    // sync
    context("when connect SyncNode", function () {
        it("should work logging after start", function () {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const syncNode = new SyncNode();
            const expectedChunk = {data: 1};
            let isCalled = false;
            sourceNode.connect(syncNode).connect(createProcess((chunk, next) => {
                isCalled = true;
                assert.deepEqual(chunk, expectedChunk);
            }));
            logger.start();
            // log after start
            logger.log(expectedChunk);
            assert(isCalled);
        });
        it("should work logging before start", function () {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const syncNode = new SyncNode();
            const expectedChunk = {data: 1};
            let isCalled = false;
            // log before start
            logger.log(expectedChunk);
            sourceNode.connect(syncNode).connect(createProcess((chunk, next) => {
                isCalled = true;
                assert.deepEqual(chunk, expectedChunk);
            }));
            logger.start();
            assert(isCalled);
        });
    });
    // async
    context("when connect AsyncNode", function () {
        it("should work logging after start", function (done) {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const async = new AsyncNode();
            const expectedChunk = {data: 1};
            sourceNode.connect(async).connect(createProcess((chunk, next) => {
                assert.deepEqual(chunk, expectedChunk);
                done();
            }));
            logger.start();
            // log after start
            logger.log(expectedChunk);
        });
        it("should work logging before start", function (done) {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const async = new AsyncNode();
            const expectedChunk = {data: 1};
            // log before start
            logger.log(expectedChunk);
            sourceNode.connect(async).connect(createProcess((chunk, next) => {
                assert.deepEqual(chunk, expectedChunk);
                done();
            }));
            logger.start();
        });
    });
    context("when connect AsyncNode -> SyncNode", function () {
        it("should work logging after start", function (done) {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const sync = new SyncNode();
            const async = new AsyncNode();
            const expectedChunk = {data: 1};
            sourceNode.connect(async).connect(sync).connect(createProcess((chunk, next) => {
                assert.deepEqual(chunk, expectedChunk);
                done();
            }));
            logger.start();
            // log after start
            logger.log(expectedChunk);
        });
        it("should work logging before start", function (done) {
            const logger = new Logger();
            const sourceNode = logger.context.createSourceNode();
            const async = new AsyncNode();
            const sync = new SyncNode();
            const expectedChunk = {data: 1};
            // log before start
            logger.log(expectedChunk);
            sourceNode.connect(async).connect(sync).connect(createProcess((chunk, next) => {
                assert.deepEqual(chunk, expectedChunk);
                done();
            }));
            logger.start();
        });
    });
    // async
    it.skip("complex example", function () {
        const logger = new Logger();
        const consoleNode = new ConsoleNode();
        const addNameNode = new TransformNode();
        const queryNode = new QueryNode();
        const sourceNode = logger.context.createSourceNode();
        sourceNode.connect(addNameNode).connect(consoleNode);
        addNameNode.connect(queryNode).connect(consoleNode);

        const nodeGraph = logger.context.createNodeGraph();
        console.log(JSON.stringify(nodeGraph.root, null, 4));
        const stack = [];
        nodeGraph.traverse({
            enter(node, parent){
                stack.push(node);
                const level = stack.length;
                console.log(new Array(level).join("\t") + `├──enter: ` + node.type);
            },
            leave(node, parent){
                stack.pop();
            }
        });
        logger.log({
            value: "value1"
        });
        logger.start();
        logger.log({
            value: "value2"
        });
    });
});
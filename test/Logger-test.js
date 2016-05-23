// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Logger from "../src/Logger";
import LoggerNode from "../src/node/LoggerNode";
import QueryNode from "../src/node/QueryNode";
class TransformNode extends LoggerNode {
    process(chunk, next) {
        chunk.name = "HAL";
        next(chunk);
    }
}
class ConsoleNode extends LoggerNode {
    process(chunk, next) {
        const parentNodeName = this.parentNode.name || "<annonymouse>";
        console.log(" => " + parentNodeName + " => ", chunk);
        next(chunk);
    }
}
describe("Logger", function () {
    // sync
    context("when sync pipeline", () => {

    });
    // multiple
    // async
    it("log ", function () {
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
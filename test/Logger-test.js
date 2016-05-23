// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import Logger from "../src/Logger";
import LoggerNode from "../src/Nodes/LoggerNode";
import QueryNode from "../src/Nodes/QueryNode";
class TransformNode extends LoggerNode {
    process(chunk) {
        chunk.name = "HAL";
        return chunk;
    }
}
class ConsoleNode extends LoggerNode {
    process(chunk, parentNode) {
        console.log(" => " + parentNode.name + " => ", chunk);
    }
}
describe("Logger", function () {
    it("log ", function () {
        const logger = new Logger();
        const consoleNode = new ConsoleNode();
        const addNameNode = new TransformNode();
        const queryNode = new QueryNode();
        const sourceNode = logger.createSourceNode();
        sourceNode.connect(addNameNode).connect(consoleNode);
        addNameNode.connect(queryNode).connect(consoleNode);

        const nodeGraph = logger.getNodeGraph();
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
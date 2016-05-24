// LICENSE : MIT
"use strict";
// Logger Context object
import SourceNode from "./nodes/SourceNode";
import LoggerNodeGraph from "./LoggerNodeGraph";
export default class LoggerContext {
    constructor(logQueue) {
        this._logQueue = logQueue;
        this._sourceNodes = [];
        this._nodeGraph = new LoggerNodeGraph();
    }

    /**
     * create SourceNode and register it as input nodes.
     * @returns {SourceNode}
     */
    createSourceNode() {
        const sourceNode = new SourceNode();
        this.addSourceNode(sourceNode);
        return sourceNode;
    }

    /**
     * add `sourceNode` as Source Node.
     * Source means that it have not parent node.
     * Well-known Input Source Node.
     * @param {SourceNode} sourceNode
     */
    addSourceNode(sourceNode) {
        this._sourceNodes.push(sourceNode);
    }

    /**
     * consume all logs from logQueue and process each log.
     */
    process() {
        const logs = this._logQueue.consumeLogs();
        logs.forEach(logChunk => {
            this._sourceNodes.forEach(sourceNode => {
                sourceNode.processIfNecessary(logChunk);
            });
        });
    }

    /**
     * create Node dependencies graph from exist sourceNodes.
     * @param {SourceNode[]} [sourceNodes]
     * @returns {LoggerNodeGraph}
     */
    createNodeGraph(sourceNodes = this._sourceNodes) {
        return this._nodeGraph.build(sourceNodes);
    }
}
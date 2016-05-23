// LICENSE : MIT
"use strict";
// Logger Context object
import SourceNode from "./Nodes/SourceNode";
import LoggerNodeGraph from "./LoggerNodeGraph";
export default class LoggerContext {
    constructor(logQueue) {
        this._logQueue = logQueue;
        this._sourceNodes = [];
        this._nodeGraph = new LoggerNodeGraph();
    }

    createSourceNode() {
        const sourceNode = new SourceNode();
        this._sourceNodes.push(sourceNode);
        return sourceNode;
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
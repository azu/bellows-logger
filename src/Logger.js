// LICENSE : MIT
"use strict";
import LogQueue from "./LogQueue";
// Logger Context object
import SourceNode from "./Nodes/SourceNode";
import LoggerNodeGraph from "./Nodes/LoggerNodeGraph";
export default class Logger {
    constructor() {
        this._isStarted = false;
        this._sourceNodes = [];
        this.logQueue = new LogQueue();
        this.nodeGraph = new LoggerNodeGraph();
    }

    createSourceNode() {
        const sourceNode = new SourceNode();
        this._sourceNodes.push(sourceNode);
        return sourceNode;
    }

    process() {
        const logs = this.logQueue.consumeLogs();
        logs.forEach(logChunk => {
            this._sourceNodes.forEach(sourceNode => {
                sourceNode.processIfNecessary(logChunk);
            });
        });
    }

    getNodeGraph() {
        return this.nodeGraph.build(this._sourceNodes);
    }

    /**
     * add chunk log to queue.
     * @param {*} chunk
     */
    log(chunk) {
        this.logQueue.addLog(chunk);
        if (this._isStarted) {
            this.process();
        }
    }

    start() {
        if (this._isStarted) {
            return;
        }
        // start
        this.process();
        this._isStarted = true;
    }
}
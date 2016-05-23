// LICENSE : MIT
"use strict";
export default class LoggerNode {
    constructor() {
        this.connections = [];
        this.name = this.displayName || this.constructor.name || "<dummy>";
    }

    process(chunk) {
        throw new Error("Should be implemented!");
    }

    processIfNecessary(chunk, parentNode) {
        // prevent infinite loop when audio graph has feedback
        // if (this.context.currentSampleFrame <= this.currentSampleFrame) {
        //     return;
        // }
        // => console.log(chunk);
        const resultChunk = this.process(chunk, parentNode) || chunk;
        // => console.log(chunk);
        this.outputs.forEach(outputNode => {
            outputNode.processIfNecessary(resultChunk, this);
        });
    }

    /**
     * Get an array of all the nodes which connect to this node.
     *
     * @return {LoggerNode[]} An array of nodes which connect to this node.
     */
    get inputs() {
        return this.connections.filter((connection) => {
            return connection.destination === this && connection.type === "name";
        }).map(connection => {
            return connection.source;
        });
    }

    /**
     * Get an array of all the nodes which this node outputs to.
     *
     * @return {LoggerNode[]} An array of nodes which this node connects to.
     */
    get outputs() {
        return this.connections.filter((connection) => {
            return connection.source === this && connection.type === "name";
        }).map(connection => {
            return connection.destination;
        });
    }

    connect(destinationNode) {
        this.connections.push({
            type: "name",
            source: this,
            destination: destinationNode
        });
        return destinationNode;
    }

    disconnect(sourceNode, destinationNode) {
        const toRemove = [];
        this.connections.forEach(function (connection) {
            if (connection.source === sourceNode && connection.destination === destinationNode) {
                toRemove.push(connection);
            }
        });
        if (toRemove.length === 0) {
            return false;
        }
        toRemove.forEach((removeNode) => {
            let index = this.connections.indexOf(removeNode);
            this.connections.splice(index, 1);
        });
        return true;
    }
}
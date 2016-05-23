// LICENSE : MIT
"use strict";
/**
 * LoggerNode is abstract Node interface.
 * LoggerNode connect next LoggerNode.
 * It is called "pipeline" mechanism.
 * @example
 *  sourceNode.connect(nextLoggerNode).connect(destinationNode);
 *
 **/
export default class LoggerNode {
    constructor() {
        this.connections = [];
        this.name = this.displayName || this.constructor.name || "<dummy>";
        // runtime information
        this.parentNode = null;
    }

    /**
     * LoggerNode main process
     * Should be override by sub classes implementation
     * @param {*} chunk chunk data is any type
     * @param {function(*)} next call the `next(chunk)` function after finish the process
     */
    process(chunk, next) {
        throw new Error(`Should be implemented!
class YourNode extends LoggerNode{
    process(chunk, next){
        // process
        next(chunk);
    }
}
`);
    }

    processIfNecessary(currentChunk, parentNode) {
        // TODO: prevent infinite loop when audio graph has feedback
        this.parentNode = parentNode;
        this.process(currentChunk, (nextChunk) => {
            this.parentNode = null;
            this.outputs.forEach(outputNode => {
                outputNode.processIfNecessary(nextChunk, this);
            });
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
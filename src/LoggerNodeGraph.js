// LICENSE : MIT
"use strict";
/**
 * @typedef {Object} LeafNode
 * @property {string} type
 * @property {LoggerNode} node
 * @property {LeafNode[]} children
 */
import {walk} from "./utils/walker";
/**
 * Create Logger Node Dependencies Graph and traverser it
 */
export default class LoggerNodeGraph {
    constructor() {
        this.root = this.createRootNode();
    }

    /**
     * create root node
     * @returns {{type: string, children: Array}}
     */
    createRootNode() {
        return {
            type: "root",
            children: []
        };
    }

    /**
     *
     * @param {LoggerNode} node
     * @param {LeafNode} LeafNode
     */
    buildChild(node, LeafNode) {
        const outputs = node.outputs;
        if (!outputs) {
            return;
        }
        const leafNode = this.addChild(node, LeafNode);
        outputs.forEach(childOutput => {
            this.buildChild(childOutput, leafNode);
        });
    }

    /**
     * @param {LoggerNode[]} sourceNodes
     * @returns {LoggerNodeGraph}
     */
    build(sourceNodes) {
        this.clear();
        sourceNodes.forEach(child => {
            this.buildChild(child, this.root);
        });
        return this;
    }

    traverse({enter, leave}) {
        return walk(this.root, {enter, leave});
    }

    /**
     *
     * @param {LoggerNode} node
     * @param {LeafNode} parentLeafNode
     * @returns {LeafNode}
     */
    addChild(node, parentLeafNode) {
        const leafNode = {};
        Object.defineProperties(leafNode, {
            type: {
                value: node.constructor.name || "<TODO>",
                enumerable: true
            },
            node: {
                value: node,
                enumerable: false
            },
            children: {
                value: [],
                enumerable: true
            }
        });
        parentLeafNode.children.push(leafNode);
        return leafNode;
    }

    /**
     * reset current node tree
     */
    clear() {
        this.root = null;
        this.root = this.createRootNode();
    }
}
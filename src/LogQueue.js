// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const eventType = "CHANGE";
export default class LogQueue extends EventEmitter {
    constructor() {
        super();
        this._logs = [];
    }

    /**
     * listen on change event and return un listen function
     * @param {function()}changeHandler
     * @returns {function()}
     */
    onChange(changeHandler) {
        this.on(eventType, changeHandler);
        return () => {
            this.removeListener(eventType, changeHandler)
        };
    }

    /**
     * consume logs
     * purge log queue. please use careful
     * @returns {Array.<*>}
     */
    consumeLogs() {
        const chunks = this._logs.slice();
        this.clear();
        return chunks;
    }

    addLog(chunk) {
        if (chunk == undefined) {
            return;
        }
        this._logs.push(chunk);
        this.emit(eventType);
    }

    clear() {
        this._logs.length = 0;
    }
}
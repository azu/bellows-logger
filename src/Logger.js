// LICENSE : MIT
"use strict";
import LogQueue from "./LogQueue";
import LoggerContext from "./LoggerContext";
/**
 * Logger is log interface.
 * @example
 *  const logger = new Logger();
 *  logger.log("you can log it!");
 *  // logger add the log to queue
 *  logger.start()
 *  // actually start logging
 *  // buffering logs are prune at this timing
 *  logger.log("you can log it!");
 *  // log log log
 */
export default class Logger {
    constructor() {
        this._isStarted = false;
        this._logQueue = new LogQueue();
        this._loggerContext = new LoggerContext(this._logQueue);
    }

    /**
     * @returns {LoggerContext}
     */
    get context() {
        return this._loggerContext;
    }

    /**
     * add chunk log to queue.
     * @param {*} chunk
     */
    log(chunk) {
        // if not started the logger, only add log to queue
        this._logQueue.addLog(chunk);
        if (this._isStarted) {
            this._loggerContext.process();
        }
    }

    /**
     * Start logging
     */
    start() {
        if (this._isStarted) {
            return;
        }
        // TODO: check connection
        // start process
        this._loggerContext.process();
        this._isStarted = true;
    }
}
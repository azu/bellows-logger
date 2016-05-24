"use strict";
const Logger = require("bellows-logger").Logger;
import ConsoleNode from "./ConsoleNode";
const logger = new Logger();
const sourceNode = logger.context.createSourceNode();
const consoleNode = new ConsoleNode();
// connect
sourceNode.connect(consoleNode);
// Now, Log actual output to `console`

// export as singleton
export default logger;
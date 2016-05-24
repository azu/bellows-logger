"use strict";
import logger from "./SingletonLogger";

logger.log("test");
logger.log({
    key: "value"
});

// start logging - previous logs start at the timing
logger.start();
// Log!
logger.log(["a", "b", "c"]);

# bellows-logger [![Build Status](https://travis-ci.org/azu/bellows-logger.svg?branch=master)](https://travis-ci.org/azu/bellows-logger)

![bellows](./docs/img/bellows.png)

Flexible/Connectable logger library for JavaScript.

## Feature

- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) like logger
- `LoggerNode` connect next `LoggerNode`
    - It is similar with `AudioNode`
    - `LoggerNode` transform/deny/filter/attach log data 

![Web Audio API](./docs/img/webaudioAPI.png)

### Log handling

We have called log data as **Chunk**.

- **Chunk** is any data format
- Can implement the transformer as sub class of `LoggerNode`
- Can implement output log data to where is

## Install

Install with [npm](https://www.npmjs.com/):

    npm install bellows-logger

## Usage

Basic usage of Logger class

```js
import {Logger} from "bellows-logger";
const logger = new Logger();
logger.log("you can log it!");
// logger add the log to queue
logger.start()
// actually start logging
// buffering logs are prune at this timing
logger.log("you can log it!");
// log log log
```

But, bellows-logger have not default behavior.
You can extensible behavior of logger using `LoggerNode`.

This architecture is inspired by Web Audio API.

You can write `ConsoleNode` that output to `console.log`:

```js
import {LoggerNode} from "bellows-logger";
class ConsoleNode extends LoggerNode {
    process(chunk, next) {
        // parentNode name
        const parentNodeName = this.parentNode.name || "<anonymous>";
        console.log(" => " + parentNodeName + " => ", chunk);
        // call next node and pass data
        next(chunk);
    }
}
```

And use the `ConsoleNode` by `connect` method:

```js
const logger = new Logger();
// source == input node
const sourceNode = logger.context.createSourceNode();
const consoleNode = new ConsoleNode();
// connect
sourceNode.connect(consoleNode);
// Now, Log actual output to `console`

logger.log("Yay!!!");// show "Yay!!!" in console
```

Node Tree:

```
├── root
	├── SourceNode
		├── ConsoleNode
```

## Changelog

See [Releases page](https://github.com/azu/bellows-logger/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.
For bugs and feature requests, [please create an issue](https://github.com/azu/bellows-logger/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](http://twitter.com/azu_re)

## License

MIT © azu

## Credit

Bellows image

- [File:Bellows (PSF).svg - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bellows_(PSF).svg "File:Bellows (PSF).svg - Wikimedia Commons")
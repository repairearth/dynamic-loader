# dynamic loader for webpack
dynamic loader module for webpack
## Usage

``` javascript
// The chunk is requested, when you require the bundle
var component = 'home/index.rcx'; // react-router component
var waitForChunk = require('dynamic?ext=rcx!./app/' + component);

// To wait until the chunk is available (and get the exports)
//  you need to async wait for it.
waitForChunk(function(file) {
	// use file like is was required with
	// var file = require("./file.js");
});
// wraps the require in a require.ensure block
```

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author vnot
	Inspired by bundle-loader
*/
var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	
	var query = loaderUtils.parseQuery(this.query);
	var ext = query.ext // 需要动态加载的资源后缀

	if (typeof ext !== 'string' || ext.trim().length === 0) {
		throw new Error("file extension should be assigned via 'ext' param");
	}

	if (new RegExp(ext).test(remainingRequest)) {
		return [
			"var cbs = [], \n",
			"	data;\n",
			"module.exports = function(cb) {\n",
			"	if(cbs) cbs.push(cb);\n",
			"	else cb(data);\n",
			"}\n",
			"require.ensure([], function(require) {\n",
			"	data = require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), ");\n",
			"	var callbacks = cbs;\n",
			"	cbs = null;\n",
			"	for(var i = 0, l = callbacks.length; i < l; i++) {\n",
			"		callbacks[i](data);\n",
			"	}\n",
			"});"].join("");
	}
	return "";
}

/*
Output format:

	var cbs = [],
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	require.ensure([], function(require) {
		data = require("xxx");
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

*/

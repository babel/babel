"use strict";
const path = require('path');

module.exports = {
	getES5Module(moduleName) {
		return require(path.join(__dirname, '..', moduleName))
	}
};

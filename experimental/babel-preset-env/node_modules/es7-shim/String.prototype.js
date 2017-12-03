'use strict';

var at = require('./String.prototype.at');
var padStart = require('./String.prototype.padStart');
var padEnd = require('./String.prototype.padEnd');
var trimLeft = require('./String.prototype.trimLeft');
var trimRight = require('./String.prototype.trimRight');

module.exports = {
	at: at,
	padStart: padStart,
	padEnd: padEnd,
	trimLeft: trimLeft,
	trimRight: trimRight,
	shim: function shimStringPrototype() {
		at.shim();
		padStart.shim();
		padEnd.shim();
		trimLeft.shim();
		trimRight.shim();
	}
};

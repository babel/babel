'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimPadStart() {
	var polyfill = getPolyfill();
	define(String.prototype, { padStart: polyfill }, { padStart: function () { return String.prototype.padStart !== polyfill; } });
	return polyfill;
};

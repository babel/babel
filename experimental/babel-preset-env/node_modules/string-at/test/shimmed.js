require('es5-shim');
require('es6-shim');
var at = require('../');
at.shim();

var test = require('tape');
var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = function f() {}.name === 'f';

test('shimmed', function (t) {
	t.equal(String.prototype.at.length, 1, 'String.prototype.at has a length of 1');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(String.prototype.at.name, 'at', 'String.prototype.at has name "at"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(String.prototype, 'at'), 'String.prototype.at is not enumerable');
		et.end();
	});

	var supportsStrictMode = (function () {
		'use strict';

		var fn = function () { return this === null; };
		return fn.call(null);
	}());

	t.test('bad object/this value', { skip: !supportsStrictMode }, function (st) {
		'use strict';

		st.throws(function () { return String.prototype.at.call(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st.throws(function () { return String.prototype.at.call(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	require('./tests')(Function.call.bind(String.prototype.at), t);

	t.end();
});

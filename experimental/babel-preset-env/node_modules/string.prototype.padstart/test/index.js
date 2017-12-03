'use strict';

var padStart = require('../');
var test = require('tape');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st.throws(function () { padStart(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st.throws(function () { padStart(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(padStart, t);

	t.end();
});

var at = require('../');
var test = require('tape');

test('as a function', function (t) {
	t.test('bad object/this value', function (st) {
		st.throws(function () { return at(undefined); }, TypeError, 'undefined is not an object');
		st.throws(function () { return at(null); }, TypeError, 'null is not an object');
		st.end();
	});

	require('./tests')(at, t);

	t.end();
});

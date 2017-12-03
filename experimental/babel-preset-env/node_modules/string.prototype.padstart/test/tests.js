'use strict';

module.exports = function (padStart, t) {
	t.test('normal cases', function (st) {
		st.equal(padStart('a', 3, 'b'), 'bba', 'string pads start with single character');
		st.equal(padStart('abc', 3, 'd'), 'abc', 'string already of maximum length noops');
		st.equal(padStart('abc', -3, 'd'), 'abc', 'string already larger than maximum length noops');
		st.equal(padStart('cd', 3, 'ab'), 'acd', 'string with maximum length equal to length plus filler length, pads');
		st.equal(padStart('abc'), 'abc', 'absent maximum length is noop');
		st.equal(padStart('a', 3), '  a', 'absent fillStr defaults to a space');
		st.equal(padStart('ed', 6, null), 'nulled', 'non-string fillStr gets stringified');

		st.end();
	});

	t.test('truncated fill string', function (st) {
		st.equal(padStart('a', 2, 'bc'), 'ba', 'truncates at the provided max length');

		st.end();
	});

	t.test('exceptions', function (st) {

		st.end();
	});
};

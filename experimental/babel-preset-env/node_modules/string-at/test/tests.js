module.exports = function (at, t) {
	t.test('string that starts with a BMP symbol', function (st) {
		st.equal(at('abc\uD834\uDF06def', -Infinity), '');
		st.equal(at('abc\uD834\uDF06def', -1), '');
		st.equal(at('abc\uD834\uDF06def', -0), 'a');
		st.equal(at('abc\uD834\uDF06def', +0), 'a');
		st.equal(at('abc\uD834\uDF06def', 1), 'b');
		st.equal(at('abc\uD834\uDF06def', 3), '\uD834\uDF06');
		st.equal(at('abc\uD834\uDF06def', 4), '\uDF06');
		st.equal(at('abc\uD834\uDF06def', 5), 'd');
		st.equal(at('abc\uD834\uDF06def', 42), '');
		st.equal(at('abc\uD834\uDF06def', +Infinity), '');
		st.equal(at('abc\uD834\uDF06def', null), 'a');
		st.equal(at('abc\uD834\uDF06def', undefined), 'a');
		st.equal(at('abc\uD834\uDF06def'), 'a');
		st.equal(at('abc\uD834\uDF06def', false), 'a');
		st.equal(at('abc\uD834\uDF06def', NaN), 'a');
		st.equal(at('abc\uD834\uDF06def', ''), 'a');
		st.equal(at('abc\uD834\uDF06def', '_'), 'a');
		st.equal(at('abc\uD834\uDF06def', '1'), 'b');
		st.equal(at('abc\uD834\uDF06def', []), 'a');
		st.equal(at('abc\uD834\uDF06def', {}), 'a');
		st.equal(at('abc\uD834\uDF06def', -0.9), 'a');
		st.equal(at('abc\uD834\uDF06def', 1.9), 'b');
		st.equal(at('abc\uD834\uDF06def', 7.9), 'f');
		st.equal(at('abc\uD834\uDF06def', Math.pow(2, 32)), '');

		st.end();
	});

	t.test('string that starts with an astral symbol', function (st) {
		st.equal(at('\uD834\uDF06def', -Infinity), '');
		st.equal(at('\uD834\uDF06def', -1), '');
		st.equal(at('\uD834\uDF06def', -0), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', +0), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', 1), '\uDF06');
		st.equal(at('\uD834\uDF06def', 2), 'd');
		st.equal(at('\uD834\uDF06def', 3), 'e');
		st.equal(at('\uD834\uDF06def', 4), 'f');
		st.equal(at('\uD834\uDF06def', 42), '');
		st.equal(at('\uD834\uDF06def', +Infinity), '');
		st.equal(at('\uD834\uDF06def', null), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', undefined), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def'), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', false), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', NaN), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', ''), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', '_'), '\uD834\uDF06');
		st.equal(at('\uD834\uDF06def', '1'), '\uDF06');
		st.end();
	});

	t.test('lone high surrogates', function (st) {
		st.equal(at('\uD834abc', -Infinity), '');
		st.equal(at('\uD834abc', -1), '');
		st.equal(at('\uD834abc', -0), '\uD834');
		st.equal(at('\uD834abc', +0), '\uD834');
		st.equal(at('\uD834abc', 1), 'a');
		st.equal(at('\uD834abc', 42), '');
		st.equal(at('\uD834abc', +Infinity), '');
		st.equal(at('\uD834abc', null), '\uD834');
		st.equal(at('\uD834abc', undefined), '\uD834');
		st.equal(at('\uD834abc'), '\uD834');
		st.equal(at('\uD834abc', false), '\uD834');
		st.equal(at('\uD834abc', NaN), '\uD834');
		st.equal(at('\uD834abc', ''), '\uD834');
		st.equal(at('\uD834abc', '_'), '\uD834');
		st.equal(at('\uD834abc', '1'), 'a');
		st.end();
	});

	t.test('lone low surrogates', function (st) {
		st.equal(at('\uDF06abc', -Infinity), '');
		st.equal(at('\uDF06abc', -1), '');
		st.equal(at('\uDF06abc', -0), '\uDF06');
		st.equal(at('\uDF06abc', +0), '\uDF06');
		st.equal(at('\uDF06abc', 1), 'a');
		st.equal(at('\uDF06abc', 42), '');
		st.equal(at('\uDF06abc', +Infinity), '');
		st.equal(at('\uDF06abc', null), '\uDF06');
		st.equal(at('\uDF06abc', undefined), '\uDF06');
		st.equal(at('\uDF06abc'), '\uDF06');
		st.equal(at('\uDF06abc', false), '\uDF06');
		st.equal(at('\uDF06abc', NaN), '\uDF06');
		st.equal(at('\uDF06abc', ''), '\uDF06');
		st.equal(at('\uDF06abc', '_'), '\uDF06');
		st.equal(at('\uDF06abc', '1'), 'a');
		st.end();
	});

	t.test('calling on `undefined`/`null`', function (st) {
		st.throws(function () { at(); }, TypeError);
		st.throws(function () { at(undefined, 4); }, TypeError);
		st.throws(function () { at(null); }, TypeError);
		st.throws(function () { at(null, 4); }, TypeError);
		st.end();
	});

	t.test('numbers', function (st) {
		st.equal(at(42, 0), '4');
		st.equal(at(42, 1), '2');
		st.equal(at(NaN, 1), 'a');
		st.equal(at({ toString: function () { return 'abc'; } }, 2), 'c');
		st.end();
	});
};

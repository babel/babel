'use strict';

var test = require('tape');

if (typeof Symbol === 'function' && typeof Symbol() === 'symbol') {
	test('has native Symbol support', function (t) {
		t.equal(typeof Symbol, 'function');
		t.equal(typeof Symbol(), 'symbol');
		t.end();
	});
	return;
}

var hasSymbols = require('../../hasSymbols');

test('polyfilled Symbols', function (t) {
	t.equal(hasSymbols(), false, 'hasSymbols is false before polyfilling');
	require('core-js/fn/symbol');
	require('core-js/fn/symbol/to-string-tag');
	var hasSymbolsAfter = hasSymbols();
	t.equal(hasSymbolsAfter, true, 'hasSymbols is true after polyfilling');
	/* eslint-disable global-require */
	if (hasSymbolsAfter) { require('../'); }
	/* eslint-enable global-require */
	t.end();
});

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
	/* eslint-disable global-require */
	t.equal(hasSymbols(), false, 'hasSymbols is false before polyfilling');
	require('get-own-property-symbols');
	var hasSymbolsAfter = hasSymbols();
	t.equal(hasSymbolsAfter, true, 'hasSymbols is true after polyfilling');
	if (hasSymbolsAfter) { require('../'); }
	/* eslint-enable global-require */
	t.end();
});

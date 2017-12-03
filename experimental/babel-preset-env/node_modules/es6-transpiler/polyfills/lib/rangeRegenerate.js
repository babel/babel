/*global module:false*/
/*es6-transpiler symbols:false, has-iterators:false, has-generators: false,*/
// call require: from RegExp polyfill

/*! This converter is based on http://mths.be/regenerate v0.5.4 by @mathias | MIT license */

let hasOwnProperty = Object.prototype.hasOwnProperty;

let append = function(object, key, value) {
	if (hasOwnProperty.call(object, key)) {
		object[key].push(value);
	} else {
		object[key] = [value];
	}
};

let sortUniqueNumbers = function(array) {
	// Sort numerically in ascending order
	array = array.sort(function(a, b) {
		return a - b;
	});
	// Remove duplicates
	let previous;
	let result = [];

	for ( let item of array ) {
		if (previous != item) {
			result.push(item);
			previous = item;
		}
	}

	return result;
};

// This assumes that `number` is a positive integer that `toString()`s nicely
// (which is the case for all code point values).
let zeroes = '0000';
let pad = function(number, totalCharacters) {
	let string = String(number);
	return string.length < totalCharacters
		? (zeroes + string).slice(-totalCharacters)
		: string;
};

/*--------------------------------------------------------------------------*/

let range = function(start, stop) {
	// inclusive, e.g. `range(1, 3)` → `[1, 2, 3]`
	if (stop < start) {
		throw Error('A range\u2019s `stop` value must be greater than or equal ' +
			'to the `start` value.');
	}
	let result = [];
	for (; start <= stop; result.push(start++));
	return result;
};

/*--------------------------------------------------------------------------*/

// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
let floor = Math.floor;
let stringFromCharCode = String.fromCharCode;
let codePointToString = function(codePoint) {
	let string;
	if (
		(codePoint >= 0x41 && codePoint <= 0x5A) ||
			(codePoint >= 0x61 && codePoint <= 0x7A) ||
			(codePoint >= 0x30 && codePoint <= 0x39)
		) {
		// [a-zA-Z0-9]
		string = stringFromCharCode(codePoint);
	} else if (codePoint <= 0xFF) {
		// http://mathiasbynens.be/notes/javascript-escapes#hexadecimal
		string = '\\x' + pad(Number(codePoint).toString(16).toUpperCase(), 2);
	} else { // if (codePoint <= 0xFFFF)
		// http://mathiasbynens.be/notes/javascript-escapes#unicode
		string = '\\u' + pad(Number(codePoint).toString(16).toUpperCase(), 4);
	}

	// There’s no need to account for astral symbols / surrogate pairs here,
	// since `codePointToString` is private and only used for BMP code points.
	// But if that’s what you need, just add an `else` block with this code:
	//
	//     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
	//     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

	return string;
};

let createBMPCharacterClasses = function(codePoints) {
	let tmp = '';
	let start = codePoints[0];
	let end = start;
	let predict = start + 1;

	codePoints = codePoints.slice(1);

	let counter = 0;

	for( let code of codePoints ) {
		if (predict == code) {
			end = code;
			predict = code + 1;
			break;
		}
		if (start == end) {
			tmp += codePointToString(start);
			counter += 1;
		} else if (end == start + 1) {
			tmp += codePointToString(start) + codePointToString(end);
			counter += 2;
		} else {
			tmp += codePointToString(start) + '-' + codePointToString(end);
			counter += 2;
		}
		start = code;
		end = code;
		predict = code + 1;
	}

	if (start == end) {
		tmp += codePointToString(start);
		counter += 1;
	} else if (end == start + 1) {
		tmp += codePointToString(start) + codePointToString(end);
		counter += 2;
	} else {
		tmp += codePointToString(start) + '-' + codePointToString(end);
		counter += 2;
	}

	if (counter == 1) {
		return tmp;
	} else {
		return '[' + tmp + ']';
	}
};

// In Regenerate output, `\0` will never be preceded by `\` because we sort
// by code point value, so let’s keep this regular expression simple:
let regexNull = /\\x00([^0123456789]|$)/g;
let createCharacterClasses = function(codePoints) {
	// At this point, it’s safe to assume `codePoints` is a sorted array of
	// numeric code point values.
	let bmp = [];
	let astralMap = {};
	let surrogates = [];
	let hasAstral = false;

	for ( let codePoint of codePoints ) {
		if (codePoint >= 0xD800 && codePoint <= 0xDBFF) {
			// If a high surrogate is followed by a low surrogate, the two code
			// units should be matched together, so that the regex always matches a
			// full code point. For this reason, separate code points that are
			// (unmatched) high surrogates are tracked separately, so they can be
			// moved to the end if astral symbols are to be matched as well.
			surrogates.push(codePoint);
		} else if (codePoint >= 0x0000 && codePoint <= 0xFFFF) {
			// non-surrogate BMP code point
			bmp.push(codePoint);
		} else if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
			// astral code point
			hasAstral = true;
			append(
				astralMap,
				parseInt(floor((codePoint - 0x10000) / 0x400) + 0xD800, 10),//high surrogate value
				parseInt((codePoint - 0x10000) % 0x400 + 0xDC00, 10)//low surrogate value
			);
		} else {
			throw RangeError('Invalid code point value. Code points range from ' +
				'U+000000 to U+10FFFF.');
		}
	}

	let astralMapByLowRanges = {};

	for (let highSurrogateValue in astralMap) if (hasOwnProperty.call(astralMap, highSurrogateValue)) {
		append(astralMapByLowRanges, createBMPCharacterClasses(astralMap[highSurrogateValue]), +highSurrogateValue);
	}

	let tmp = [];
	// If we’re not dealing with any astral symbols, there’s no need to move
	// individual code points that are high surrogates to the end of the regex.
	if (!hasAstral && surrogates.length) {
		bmp = sortUniqueNumbers(bmp.concat(surrogates));
	}
	if (bmp.length) {
		tmp.push(createBMPCharacterClasses(bmp));
	}
	for (let lowSurrogateValue in astralMapByLowRanges) if (hasOwnProperty.call(astralMapByLowRanges, lowSurrogateValue)) {
		tmp.push(createBMPCharacterClasses(astralMapByLowRanges[lowSurrogateValue]) + lowSurrogateValue);
	}
	// Individual code points that are high surrogates must go at the end
	// if astral symbols are to be matched as well.
	if (hasAstral && surrogates.length) {
		tmp.push(createBMPCharacterClasses(surrogates));
	}
	return tmp
		.join('|')
		// Use `\0` instead of `\x00` where possible
		.replace(regexNull, '\\0$1');
};

module.exports = function fromCodePointRange(start, end) {
	return createCharacterClasses(range(start, end));
};

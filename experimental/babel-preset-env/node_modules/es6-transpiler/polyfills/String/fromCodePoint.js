/*global module:false*/
/*es6-transpiler symbols:false, has-iterators:false, has-generators: false*/
// call require: from RegExp polyfill

module.exports = function(global) {
	let _String = global["String"];

	if ( !_String["fromCodePoint"] )_String["fromCodePoint"] = function fromCodePoint(...codePoints) {
		if ( !codePoints.length ) {
			return '';
		}

		let codeUnits = [];
		for ( let codePoint of codePoints ) {
			codePoint = Number(codePoint);

			if ( !isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || Math.floor(codePoint) != codePoint ) {
				throw new RangeError('Invalid code point: ' + codePoint);
			}

			if ( codePoint <= 0xFFFF ) {
				codeUnits.push(codePoint);
			}
			else {
				codePoint -= 0x10000;
				codeUnits.push((codePoint >> 10) + 0xD800, (codePoint % 0x400) + 0xDC00);
			}
		}

		return String.fromCharCode(...codeUnits);
	}
};

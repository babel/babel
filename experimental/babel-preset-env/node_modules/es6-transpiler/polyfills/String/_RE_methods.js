/*global module*/
/*es6-transpiler symbols:false, has-iterators:false, has-generators: false*/
// call require: from RegExp polyfill

module.exports = function(global, RegExp, updateGlobalRegExpProperties) {
	let globalString_prototype = global["String"].prototype
		, $string_replace = globalString_prototype.replace
	;

	globalString_prototype.replace = function(pattern, replacer) {
		let result;
		let patternIsRegExpWithStickyAndGlobalFlag = pattern
			&& typeof pattern === 'object'
			&& pattern instanceof RegExp
			&& pattern["sticky"]
			&& pattern.global
		;

		if( patternIsRegExpWithStickyAndGlobalFlag ) {
			// String.match and String.replace now reset RegExp.lastIndex
			// [https://bugzilla.mozilla.org/show_bug.cgi?id=501739](Bug 501739 � String match and replace methods do not update global regexp lastIndex per ES3&5)
			// The String.match and String.replace methods have been refactored to resolve a spec conformance issue on RegExp.lastIndex. When those methods are called with a global regular expression, the lastIndex, if specified, will be reset to 0.
			pattern.lastIndex = 0;

			let isFunction = typeof replacer === 'function';
			if ( !isFunction ) {
				replacer = String(replacer);
			}

			let str = this + "", execRes
				, parts = [], lastIndex = 0
			;
			while( execRes = pattern.exec(str) ) {
				var found = execRes[0]
					, args = execRes
					, end = pattern.lastIndex
				;

//						parts.push(str.substring(lastIndex, start));

				if ( isFunction ) {
					args.push(lastIndex, str);
					parts.push(replacer.apply(void 0, args));
				}
				else {
					// "12345678987654321".replace(/4/g, "($&)") + " - " + "12345678987654321".replace(/4/g, "($`)") + " - " + "12345678987654321".replace(/4/g, "($')") + " - " + "12345678987654321".replace(/(4)/g, "($1)")
					// "123(4)567898765(4)321 - 123(123)567898765(1234567898765)321 - 123(5678987654321)567898765(321)321 - 123(4)567898765(4)321"
//							"$1$$1($')($`)($&)($12)".replace(/\$(?:(')|(`)|(\&)|(\d(?:\d)?))/g, function(str, $1, $2, $3, $nn, offset, string){
//								console.log(string[offset - 1], str, $1, $2, $3, $nn)
//							})
					parts.push(replacer.replace(/\$(?:(&)|(`)|(')|(\d(?:\d)?))/g, function(pattern, $1, $2, $3, $nn, offset, string) {
						if ( string[offset - 1] !== '$' ) {
							if ( $1 ) {// $& - Inserts the matched substring.
								return found;
							}
							if ( $2 ) {// $` - Inserts the portion of the string that precedes the matched substring.
								return str.substring(0, lastIndex);
							}
							if ( $3 ) {// $' - Inserts the portion of the string that follows the matched substring.
								return str.substring(end);
							}
							if ( $nn ) {// $n or $nn - Where n or nn are decimal digits, inserts the nth parenthesized submatch string, provided the first argument was a RegExp object.
								$nn = +$nn;
								if ( $nn !== 0 && $nn < args.length ) {
									return args[$nn];
								}
							}
						}
						else {
							pattern = pattern.substring(1);
						}
						return pattern;
					}));
				}

				lastIndex = end;
			}

			parts.push(str.substring(lastIndex));

			result = parts.join("");
			parts = void 0;
		}
		else {
			result = $string_replace.apply(this, arguments);
		}

		if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

		return result;
	};
	let $match = globalString_prototype.match;
	globalString_prototype.match = function(pattern) {
		let result;
		let patternIsRegExpWithStickyFlag = pattern && typeof pattern === 'object' && pattern instanceof RegExp && pattern["sticky"];

		if( patternIsRegExpWithStickyFlag ) {
			if( pattern.global ) {
				result = [];
				let execRes;
				while( execRes = pattern.exec(this) ) {
					result.push(execRes[0]);
				}
			}
			else {
				result = pattern.exec(this);
			}
		}
		else {
			result = $match.apply(this, arguments);
		}

		if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

		return result;
	};
};

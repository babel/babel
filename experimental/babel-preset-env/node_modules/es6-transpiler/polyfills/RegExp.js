/*global require:false*/
/*es6-transpiler symbols:false, has-iterators:false, has-generators: false*/
//(function(){"use strict";

let regExp_flag_u_support = false
	, regExp_flag_y_support = false
;

try {
	(new RegExp("1", "u")).test("1");
	regExp_flag_u_support = true;
}
catch(e){}

try {
	(new RegExp("1", "y")).test("1");
	regExp_flag_y_support = true;
}
catch(e){}

if( !regExp_flag_u_support || !regExp_flag_y_support ) {
	let $RegExp = RegExp
		, global = (new Function("return this"))()
		, convertUnicodeSequenceToES5Compatible
		, convertUnicodeSequenceToES5Compatible_failed
		, convertUnicodeSequenceToES5Compatible_Map
		, codePointsToES5Range_Map
		, has__getter__support = (function(){
			try {
				var random = Math.random();
				var propName = "sentinel";
				var obj = Object.defineProperty({}, propName, {"get": function(){ return random }});
				return obj[propName] == random;
			}
			catch (e){
				return false;
			}
		})()
		, updateGlobalRegExpProperties
		, globalString_prototype = global["String"].prototype
		, $string_replace = globalString_prototype.replace
		, unescapeUnicode
	;

	let beforeRegExpCreate = function(pattern, has_u_flag, has_y_flag) {
		if( has_u_flag ) {
			let newPattern = convertUnicodeSequenceToES5Compatible_Map[pattern];
			if ( newPattern === void 0 ) {
				newPattern = convertUnicodeSequenceToES5Compatible(pattern);
				if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
					convertUnicodeSequenceToES5Compatible_Map[pattern] = false;
				}
				else {
					pattern = convertUnicodeSequenceToES5Compatible_Map[pattern] = newPattern;

					convertUnicodeSequenceToES5Compatible_Map[newPattern] = true;
				}
			}
			else if ( newPattern === true || newPattern === false ) {
				// true - nothing to convert
				// false - can't convert
			}
			else {
				pattern = newPattern;
			}
		}

		if( has_y_flag ) {
			let lineStartIndex = pattern.indexOf("^");
			if( lineStartIndex === -1 || (pattern[lineStartIndex - 1] === "\\") ) {
				pattern = "^" + pattern;
			}
		}

		return pattern;
	};

	let afterRegExpCreate = function(re, originalPattern, has_u_flag, has_y_flag) {
		if( originalPattern !== void 0 ) {
			Object.defineProperty(re, "__pattern__", {"value": originalPattern});
		}

		if( !regExp_flag_u_support ) {
			Object.defineProperty(re, "unicode", {"value": has_u_flag, "configurable": true});
		}

		if( !regExp_flag_y_support ) {
			Object.defineProperty(re, "sticky", {"value": has_y_flag, "configurable": true});
		}
	};

	let extendedRegExp = function RegExp(pattern, flags) {
		let has_u_flag = false, originalPattern;
		let has_y_flag = false;

		if( flags ) {
			pattern = String(pattern);

			originalPattern = pattern;

			flags = String(flags);
			has_u_flag = !regExp_flag_u_support && flags.indexOf("u") !== -1;
			has_y_flag = !regExp_flag_y_support && flags.indexOf("y") !== -1;

			convertUnicodeSequenceToES5Compatible_failed = false;
			pattern = beforeRegExpCreate(pattern, has_u_flag, has_y_flag);

			if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
				// something goes wrong and we were not able to modify the es6 Unicode sequence -> do not touch patten and flags
				flags = flags.replace("y", "");
				pattern = originalPattern;
			}
			else {
				flags = flags.replace("u", "" ).replace("y", "");
			}

			if ( pattern == originalPattern ) {
				originalPattern = void 0;
			}
		}

		let re = new $RegExp(pattern, flags);// new RegExp object

		if( has_u_flag || has_y_flag ) {
			afterRegExpCreate(re, originalPattern, has_u_flag, has_y_flag);
		}

		return re;
	};
	extendedRegExp.prototype = $RegExp.prototype;
	global["RegExp"] = extendedRegExp;

	let $compile = extendedRegExp.prototype["compile"];
	if ( typeof $compile === 'function' ) {
		extendedRegExp.prototype["compile"] = function(pattern, flags) {
			let has_u_flag = false, originalPattern;
			let has_y_flag = false;

			if( flags ) {
				flags = String(flags);
				originalPattern = pattern = String(pattern)
				has_u_flag = !regExp_flag_u_support && flags.indexOf("u") !== -1;
				has_y_flag = !regExp_flag_y_support && flags.indexOf("y") !== -1;

				convertUnicodeSequenceToES5Compatible_failed = false;
				pattern = beforeRegExpCreate(pattern, has_u_flag, has_y_flag);

				if ( convertUnicodeSequenceToES5Compatible_failed === true ) {
					// something goes wrong and we were not able to modify the es6 Unicode sequence -> do not touch patten
					pattern = originalPattern;
				}

				flags = flags.replace("u", "" ).replace("y", "");

				if ( pattern == originalPattern ) {
					originalPattern = void 0;
				}
			}

			let re = $compile.apply(this, arguments);

			if( flags ) {
				afterRegExpCreate(re, originalPattern, has_u_flag, has_y_flag);
			}
		};
	}

	if ( !regExp_flag_u_support ) {
		unescapeUnicode = require('./lib/unescapeUnicode.js');

		extendedRegExp["__polyfill__"] = function(convertUnicodeSequence_Map, codePointsRange_Map) {
			if ( convertUnicodeSequence_Map && typeof convertUnicodeSequence_Map === 'object' ) {
				if ( !convertUnicodeSequenceToES5Compatible_Map ) {
					convertUnicodeSequenceToES5Compatible_Map = {};
				}

				for( let key in convertUnicodeSequence_Map ) if ( convertUnicodeSequence_Map.hasOwnProperty(key) ) {
					let newPattern = convertUnicodeSequenceToES5Compatible_Map[key] = convertUnicodeSequence_Map[key];
					let unescapedKey = unescapeUnicode(key);
					if ( key !== unescapedKey ) {
						convertUnicodeSequenceToES5Compatible_Map[unescapedKey] = newPattern;
					}
					if ( typeof newPattern === 'string' ) {
						convertUnicodeSequenceToES5Compatible_Map[newPattern] = true;
					}
				}
			}

			if ( codePointsRange_Map && typeof codePointsRange_Map === 'object' ) {
				if ( !codePointsToES5Range_Map ) {
					codePointsToES5Range_Map = codePointsRange_Map;
				}
				else {
					for( let key in codePointsToES5Range_Map ) if ( codePointsToES5Range_Map.hasOwnProperty(key) ) {
						convertUnicodeSequenceToES5Compatible_Map[key] = codePointsToES5Range_Map[key];
					}
				}
			}
		};

		if ( "__polyfill__" in $RegExp ) {
			let initialData = $RegExp["__polyfill__"];
			delete $RegExp["__polyfill__"];

			if ( Array.isArray(initialData) ) {
				let data;
				while ( data = initialData.shift() ) {
					if ( Array.isArray(data) ) {
						extendedRegExp["__polyfill__"](data[0], data[1]);
					}
				}
			}
		}
	}

	if( has__getter__support ) {
		Object.keys($RegExp).forEach(function(key) {
			let desc = Object.getOwnPropertyDescriptor($RegExp, key);

			if( "value" in desc ) {
				delete desc["value"];
				delete desc["writable"];
			}
			if( key === "leftContext" ) {
				desc["get"] = function() {
					let $leftContext = this["__leftContext__"];
					return $leftContext === void 0 ? $RegExp["leftContext"] : $leftContext;
				};
			}
			else {
				desc["get"] = function() {
					return $RegExp[key];
				};
			}
			desc["set"] = function(value) {
				$RegExp[key] = value;
				return value;
			};

			Object.defineProperty(extendedRegExp, key, desc);
		});

	}
	else {
		let $RegExp_keys = Object.keys($RegExp ).filter(function(key){ return key !== "leftContext"});

		updateGlobalRegExpProperties = function() {
			for( let key of $RegExp_keys ) {
				extendedRegExp[key] = $RegExp[key];
			}
			let $leftContext = extendedRegExp["__leftContext__"];
			extendedRegExp["leftContext"] = $leftContext === void 0 ? $RegExp["leftContext"] : $leftContext;
		};

		updateGlobalRegExpProperties();
	}
	if ( !regExp_flag_y_support )Object.defineProperty(extendedRegExp, "sticky", {"value": false, "enumerable": true});
	if ( !regExp_flag_u_support )Object.defineProperty(extendedRegExp, "unicode", {"value": false, "enumerable": true});

	{
		let $toString = extendedRegExp.prototype.toString;
		let newToString = function toString() {
			let result = $toString.apply(this, arguments);

			if( !regExp_flag_y_support || !regExp_flag_u_support ) {
				let originalPattern = this["__pattern__"];

				if( originalPattern !== void 0 ) {
					result = "/" + originalPattern + "/"
						+ (this.global ? "g" : "") + (this.ignoreCase ? "i" : "") + (this.multiline ? "m" : "") + (this["sticky"] ? "y" : "") + (this["unicode"] ? "u" : "")
					;
				}
				else {
					if( this["sticky"] ) {
						result += "y";
					}
					if( this["unicode"] ) {
						result += "u";
					}
				}
			}

			return result;
		};

		let newProps = {
			"sticky": {"value": false, "configurable": true, "writable": true}
			, "unicode": {"value": false, "configurable": true, "writable": true}
			, "toString": {"value": newToString, "configurable": true, "writable": true}
		};

		if( regExp_flag_y_support ) {
			delete newProps["sticky"];
		}

		if( regExp_flag_u_support ) {
			delete newProps["unicode"];
		}
		else {
			let zeroCodePoint = function(string) {
				let size = string.length;
				let first = string.charCodeAt(0);
				let second;
				if (first >= 0xD800 && first <= 0xDBFF && size > 1) {
					second = string.charCodeAt(1);
					if (second >= 0xDC00 && second <= 0xDFFF) {
						return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
					}
				}
				if ( size > 1 ) {
//					throw new Error('Invalid unicode range');
					return false;//not supported
				}
				return first;
			};
			let es6unicodeRangeConverter = require('./lib/rangeRegenerate.js');

			let unicodeRange = function(str, code11, code12, char1, code21, code22, char2) {
				// TODO:: [\x01-\uD7FF\uDC00-\uFFFF], [a-b-c-e] support
				if ( code11 ) {
					code11 = parseInt(code11, 16);
					if ( code12 ) {
						char1 = String.fromCharCode(code11, parseInt(code12, 16));
					}
					else {
						char1 = String.fromCharCode(code11);
					}
				}
				let codePoint1 = zeroCodePoint(char1);
				if ( codePoint1 === false ) {
					convertUnicodeSequenceToES5Compatible_failed = true;
					return str;//not supported
				}

				if ( code21 ) {
					code21 = parseInt(code21, 16);
					if ( code22 ) {
						char2 = String.fromCharCode(code21, parseInt(code22, 16));
					}
					else {
						char2 = String.fromCharCode(code21);
					}
				}
				let codePoint2 = zeroCodePoint(char2);
				if ( codePoint2 === false ) {
					convertUnicodeSequenceToES5Compatible_failed = true;
					return str;//not supported
				}

				let key = `${codePoint1}|${codePoint2}`;
				let result = codePointsToES5Range_Map[key];

				if ( result === void 0 ) {
					result = es6unicodeRangeConverter(codePoint1, codePoint2);

					if ( result.indexOf("|") !== -1 ) {
						result = `(?:${result})`;
					}

					codePointsToES5Range_Map[key] = result;
				}

				return result;
			};

			require('./String/fromCodePoint.js');
			let fromCodePoint = String["fromCodePoint"];
			let charCodeToString = function(charCode) {
				charCode = charCode.toString(16).toUpperCase();
				var length = charCode.length;

				return "\\u" + (new Array(5 - length)).join("0") + charCode;
			};
			let charCodesFromCodePoint = function(codePoint) {
				if ( typeof codePoint != "number" ) {
					codePoint = parseInt(codePoint, 16)
				}

				var codePointString = fromCodePoint(codePoint);
				var length = codePointString.length;

				return charCodeToString(codePointString.charCodeAt(0)) + (length > 1 ? charCodeToString(codePointString.charCodeAt(1)) : "");
			};
			let replaceES6CodePointEscape = function(found, group, offset, str) {
				let sFount = 0, prevChar;

				while( (prevChar = str[offset--]) === '\\' ) {
					sFount++;
				}

				if ( sFount % 2 === 1 ) {//not escaped
					return charCodesFromCodePoint(group);
				}
				else {
					return "\\u{" + group + "}";
				}
			};

			let findCodePoint_RE = new RegExp('\\[' +
				'(?:' +
					'(?:(?:\\\\u(\\w{4}))(?:\\\\u(\\w{4}))?)' +
//					'|((?:[\\0-\\u005A\\u005C\\u005F-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
					'|((?:[\\0-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
				')' +
				'\\-' +
				'(?:' +
					'(?:(?:\\\\u(\\w{4}))(?:\\\\u(\\w{4}))?)' +
//					'|((?:[\\0-\\u005A\\u005C\\u005F-\\uD7FF\\uDC00-\\uFFFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF]|[\\uD800-\\uDBFF])+?)' +
					'|((?:[\\0-\\uD7FF\\uDC00-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF])+?)' +
				')' +
			'\\]', 'g');

			convertUnicodeSequenceToES5Compatible = function(pattern) {
				// TODO:: /foo.bar/u -> /foo(?:\s|[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u
				// TODO:: /foo\Sbar/u -> /foo(?:[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u
				// TODO:: /foo[\s\S]bar/u -> /foo[\s]|(?:[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])bar/u

				return $string_replace.call($string_replace.call(pattern, /\\u\{(\w{1,6})\}/g, replaceES6CodePointEscape), findCodePoint_RE, unicodeRange);
			};
			if ( !convertUnicodeSequenceToES5Compatible_Map ) {
				convertUnicodeSequenceToES5Compatible_Map = {};
			}
			if ( !codePointsToES5Range_Map ) {
				codePointsToES5Range_Map = {};
			}
		}

		Object.defineProperties(extendedRegExp.prototype, newProps);
	}

	if( !regExp_flag_y_support ) {
		let $exec = extendedRegExp.prototype.exec;
		extendedRegExp.prototype.exec = function(string) {
			extendedRegExp["__leftContext__"] = void 0;

			let sticky = this["sticky"]
				, _global
				, lastIndex
				, leftContext
			;

			if( sticky ) {
				({lastIndex, "global": _global}) = this;

				if( lastIndex != 0 ) {
					if( _global ) {
						this.lastIndex = 0;
					}

					leftContext = string.substring(0, lastIndex);
					arguments[0] = String(string).substr(lastIndex);
				}
			}

			let result = $exec.apply(this, arguments);

			if( sticky ) {
				this.lastIndex = result == null ? 0 : lastIndex + (_global ? this.lastIndex : result[0].length);
				extendedRegExp["__leftContext__"] = leftContext !== void 0 && result != null ? leftContext : void 0;
			}

			if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

			return result;
		}
		let $test = extendedRegExp.prototype.test;
		extendedRegExp.prototype.test = function(string) {
			extendedRegExp["__leftContext__"] = void 0;

			let {"sticky": sticky} = this
				, result
			;

			if( sticky ) {
				let {lastIndex, "global": _global} = this
					, leftContext
				;

				if( lastIndex != 0 ) {
					if( _global ) {
						this.lastIndex = 0;
					}

					leftContext = string.substring(0, lastIndex);
					arguments[0] = String(string).substr(lastIndex);
				}

				result = $exec.apply(this, arguments);

				this.lastIndex = result ? lastIndex + (_global ? this.lastIndex : result[0].length) : 0;
				extendedRegExp["__leftContext__"] = leftContext !== void 0 && result != null ? leftContext : void 0;

				result = result != null;
			}
			else {
				result = $test.apply(this, arguments);
			}

			if ( updateGlobalRegExpProperties !== void 0 )updateGlobalRegExpProperties();

			return result;
		};

		require('./String/_RE_methods.js')(global, $RegExp, updateGlobalRegExpProperties);
	}
}

//})();

var $freeze$0 = Object.freeze;var $defProps$0 = Object.defineProperties;var $TS$0 = $freeze$0($defProps$0(["\uD834\uDF06"], {"raw": {"value": $freeze$0(["\\u{1D306}"])}}));var $TS$1 = $freeze$0($defProps$0(["first\uD834\uDF06"], {"raw": {"value": $freeze$0(["first\\u{1D306}"])}}));var $TS$2 = $freeze$0($defProps$0(["\u00A9\uD834\uDF06"], {"raw": {"value": $freeze$0(["\\u00A9\\u{1D306}"])}}));var $TS$3 = $freeze$0($defProps$0(["\uD834\uDF06second"], {"raw": {"value": $freeze$0(["\\u{1D306}second"])}}));var $TS$4 = $freeze$0($defProps$0(["\uD834\uDF06\u00A9"], {"raw": {"value": $freeze$0(["\\u{1D306}\\u00A9"])}}));var $TS$5 = $freeze$0($defProps$0(["\\u{1D306}\\u00A9"], {"raw": {"value": $freeze$0(["\\\\u{1D306}\\\\u00A9"])}}));
// Unicode-code-point-escapes
// @see http://mathiasbynens.be/notes/javascript-escapes#unicode-code-point

{// simple
	var ABC = '\u0041\u0042\u0043';
	console.log(ABC === 'ABC');
}

{
	var tetragram1 = "\uD834\uDF06";
	var tetragram2 = '\uD834\uDF06';
	var tetragram3 = ("\uD834\uDF06");
	var tetragram4 = tag($TS$0);
	console.log(tetragram1 === "\uD834\uDF06");
	console.log(tetragram2 === "\uD834\uDF06");
	console.log(tetragram3 === "\uD834\uDF06");
	console.log(tetragram4 === "\uD834\uDF06");
}

{
	var tetragram1$0 = "first\uD834\uDF06";
	var tetragram2$0 = 'first\uD834\uDF06';
	var tetragram3$0 = ("first\uD834\uDF06");
	var tetragram4$0 = tag($TS$1);
	console.log(tetragram1$0 === "first\uD834\uDF06");
	console.log(tetragram2$0 === "first\uD834\uDF06");
	console.log(tetragram3$0 === "first\uD834\uDF06");
	console.log(tetragram4$0 === "first\uD834\uDF06");
}

{
	var tetragram1$1 = "\u00A9\uD834\uDF06";
	var tetragram2$1 = '\u00A9\uD834\uDF06';
	var tetragram3$1 = ("\u00A9\uD834\uDF06");
	var tetragram4$1 = tag($TS$2);
	console.log(tetragram1$1 === "\u00A9\uD834\uDF06");
	console.log(tetragram2$1 === "\u00A9\uD834\uDF06");
	console.log(tetragram3$1 === "\u00A9\uD834\uDF06");
	console.log(tetragram4$1 === "\u00A9\uD834\uDF06");
}

{
	var tetragram1$2 = "\uD834\uDF06second";
	var tetragram2$2 = '\uD834\uDF06second';
	var tetragram3$2 = ("\uD834\uDF06second");
	var tetragram4$2 = tag($TS$3);
	console.log(tetragram1$2 === "\uD834\uDF06second");
	console.log(tetragram2$2 === "\uD834\uDF06second");
	console.log(tetragram3$2 === "\uD834\uDF06second");
	console.log(tetragram4$2 === "\uD834\uDF06second");
}

{
	var tetragram1$3 = "\uD834\uDF06\u00A9";
	var tetragram2$3 = '\uD834\uDF06\u00A9';
	var tetragram3$3 = ("\uD834\uDF06\u00A9");
	var tetragram4$3 = tag($TS$4);
	console.log(tetragram1$3 === "\uD834\uDF06\u00A9");
	console.log(tetragram2$3 === "\uD834\uDF06\u00A9");
	console.log(tetragram3$3 === "\uD834\uDF06\u00A9");
	console.log(tetragram4$3 === "\uD834\uDF06\u00A9");
}

{// escaped
	var tetragram1$4 = "\\u{1D306}\\u00A9";
	var tetragram2$4 = '\\u{1D306}\\u00A9';
	var tetragram3$4 = ("\\u{1D306}\\u00A9");
	var tetragram4$4 = tag($TS$5);
	console.log(tetragram1$4 === "\\u{1D306}\\u00A9");
	console.log(tetragram2$4 === "\\u{1D306}\\u00A9");
	console.log(tetragram3$4 === "\\u{1D306}\\u00A9");
	console.log(tetragram4$4 === "\\u{1D306}\\u00A9");
}

function tag(quasis) {var SLICE$0 = Array.prototype.slice;var expressionValues = SLICE$0.call(arguments, 1);
	var quasisLen = quasis.length;

	var s = '', i = 0;
	while (true) {
		s += quasis[i];
		if (i + 1 === quasisLen) {
			return s;
		}
		s += expressionValues[i++];
	}
}
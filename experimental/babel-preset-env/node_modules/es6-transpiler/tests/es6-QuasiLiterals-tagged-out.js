var $freeze$0 = Object.freeze;var $defProps$0 = Object.defineProperties;var $TS$0 = ["one"];$TS$0 = $freeze$0($defProps$0($TS$0, {"raw": {"value": $TS$0}}));var $TS$1 = $freeze$0($defProps$0(["\n<", ">\t - \n<", ">\t"], {"raw": {"value": $freeze$0(["\\n<", ">\\t - \\n<", ">\\t"])}}));var $TS$3 = $freeze$0($defProps$0(["\0"], {"raw": {"value": $freeze$0(["\\0"])}}));var $TS$4 = $freeze$0($defProps$0(["\b"], {"raw": {"value": $freeze$0(["\\b"])}}));var $TS$5 = $freeze$0($defProps$0(["\f"], {"raw": {"value": $freeze$0(["\\f"])}}));var $TS$6 = $freeze$0($defProps$0(["\n"], {"raw": {"value": $freeze$0(["\\n"])}}));var $TS$7 = $freeze$0($defProps$0(["\r"], {"raw": {"value": $freeze$0(["\\r"])}}));var $TS$8 = $freeze$0($defProps$0(["\t"], {"raw": {"value": $freeze$0(["\\t"])}}));var $TS$9 = $freeze$0($defProps$0(["\v"], {"raw": {"value": $freeze$0(["\\v"])}}));var $TS$10 = $freeze$0($defProps$0(["\\"], {"raw": {"value": $freeze$0(["\\\\"])}}));var $TS$11 = ["\""];$TS$11 = $freeze$0($defProps$0($TS$11, {"raw": {"value": $TS$11}}));var $TS$12 = ["'"];$TS$12 = $freeze$0($defProps$0($TS$12, {"raw": {"value": $TS$12}}));var $TS$13 = ["\"\""];$TS$13 = $freeze$0($defProps$0($TS$13, {"raw": {"value": $TS$13}}));var $TS$14 = ["''"];$TS$14 = $freeze$0($defProps$0($TS$14, {"raw": {"value": $TS$14}}));var $TS$15 = $freeze$0($defProps$0(["\"\"\""], {"raw": {"value": $freeze$0(["\"\\\"\""])}}));var $TS$16 = $freeze$0($defProps$0(["'\''"], {"raw": {"value": $freeze$0(["'\\''"])}}));var $TS$17 = $freeze$0($defProps$0(["\x22\x21\x224"], {"raw": {"value": $freeze$0(["\\x22\\x21\\x224"])}}));var $TS$18 = $freeze$0($defProps$0(["\u2222\u2221\u22449"], {"raw": {"value": $freeze$0(["\\u2222\\u2221\\u22449"])}}));var $TS$19 = ["<table>", "</table>"];$TS$19 = $freeze$0($defProps$0($TS$19, {"raw": {"value": $TS$19}}));var $TS$20 = ["<tr>", "</tr>"];$TS$20 = $freeze$0($defProps$0($TS$20, {"raw": {"value": $TS$20}}));var $TS$21 = ["<td>", "</td>"];$TS$21 = $freeze$0($defProps$0($TS$21, {"raw": {"value": $TS$21}}));var assert = function(a, m){ if(!a)throw new Error(m||"") }

var filter = void 0;
function test(quasis){var SLICE$0 = Array.prototype.slice;var expressionValues = SLICE$0.call(arguments, 1);
	var raw = quasis.raw;

	var rawLen = raw.length;
	var quasisLen = quasis.length;

	assert(quasisLen);
	assert(rawLen);
	assert(quasisLen === rawLen);
	assert(quasisLen === 1 || expressionValues.length);

	try {raw.length = 0;}catch(e){}
	assert(raw.length === rawLen, 'raw array should be sealed');

	try {quasis.length = 0;}catch(e){}
	assert(quasis.length === quasisLen, 'quasis array should be sealed');

	expressionValues = expressionValues.map( filter || (function(x)  {return (("(" + x) + ")")}) )

	var s = '', i = 0;
	while (true) {
		s += raw[i];
		if (i + 1 === rawLen) {
			return s;
		}
		s += expressionValues[i++];
	}
}

var name = ("name");

{
	var one = test($TS$0);
	console.log(one === 'one');
}

{// simple
	var a = test($TS$1,  40 + 2 ,  name );
	console.log(a === '\\n<(42)>\\t - \\n<(name)>\\t');

	var b = (("\n" + (40 + 2)) + ("\t - \n<" + name) + ">\t");
	console.log(b === '\n42\t - \n<name>\t');

//	let c = String.raw`\n<${ 40 + 2 }>\t - \n<${ name }>\t`;
//	console.log(c === '\\n<42>\\t - \\n<name>\\t' )

	(function() {var $TS$2 = $freeze$0($defProps$0(["\n<{", "}>\t - \n<{", "}>\t"], {"raw": {"value": $freeze$0(["\\n<{", "}>\\t - \\n<{", "}>\\t"])}}));
		var a1 = test($TS$1,  1 ,  2 );
		console.log(a1 === '\\n<(1)>\\t - \\n<(2)>\\t');

		var a2 = test($TS$2,  3 ,  4 );
		console.log(a2 === '\\n<{(3)}>\\t - \\n<{(4)}>\\t');
	})();
}

{// raw special symbols
	var z0 = test($TS$3), b$0 = test($TS$4), f = test($TS$5), n = test($TS$6), r = test($TS$7), t = test($TS$8), v = test($TS$9), bs = test($TS$10), q1 = test($TS$11), q2 = test($TS$12), q1q1 = test($TS$13), q2q2 = test($TS$14), q1_q1q1 = test($TS$15), q2_q2q2 = test($TS$16);
	var string = (("" + z0) + ("|" + b$0) + ("|" + f) + ("|" + n) + ("|" + r) + ("|" + t) + ("|" + v) + ("|" + bs) + ("|" + q1) + ("|" + q2) + ("|" + q1q1) + ("|" + q2q2) + ("|" + q1_q1q1) + ("|" + q2_q2q2) + "");
	console.log(string === "\\0|\\b|\\f|\\n|\\r|\\t|\\v|\\\\|\"|'|\"\"|''|\"\\\"\"|'\\''");
}

{// raw unicode, hex
	var hex = test($TS$17);
	console.log(hex === "\\x22\\x21\\x224");
	var unicode = test($TS$18);
	console.log(unicode === "\\u2222\\u2221\\u22449");
}

{// nested

	filter = function safehtml(val) {
		if( Array.isArray(val) )return val.join("");
		return ("" + val).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;')
	};

	var rows = [['Unicorns', 'Sunbeams', 'Puppies'], ['<3', '<3', '<3']];
	var html = test($TS$19, 
		rows.map(function(row) {
			return test($TS$20, 
				row.map(function(cell) 
					{return test($TS$21, cell)}
				)
			)
		})
	);
	console.log(html === '<table><tr><td>Unicorns</td><td>Sunbeams</td><td>Puppies</td></tr><tr><td>&lt;3</td><td>&lt;3</td><td>&lt;3</td></tr></table>')
}

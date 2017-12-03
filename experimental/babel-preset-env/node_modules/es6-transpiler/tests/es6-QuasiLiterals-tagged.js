var assert = function(a, m){ if(!a)throw new Error(m||"") }

let filter = void 0;
function test(quasis, ...expressionValues){
	const {raw} = quasis;

	const rawLen = raw.length;
	const quasisLen = quasis.length;

	assert(quasisLen);
	assert(rawLen);
	assert(quasisLen === rawLen);
	assert(quasisLen === 1 || expressionValues.length);

	try {raw.length = 0;}catch(e){}
	assert(raw.length === rawLen, 'raw array should be sealed');

	try {quasis.length = 0;}catch(e){}
	assert(quasis.length === quasisLen, 'quasis array should be sealed');

	expressionValues = expressionValues.map( filter || ((x) => `(${x})`) )

	let s = '', i = 0;
	while (true) {
		s += raw[i];
		if (i + 1 === rawLen) {
			return s;
		}
		s += expressionValues[i++];
	}
}

const name = `name`;

{
	let one = test`one`;
	console.log(one === 'one');
}

{// simple
	let a = test`\n<${ 40 + 2 }>\t - \n<${ name }>\t`;
	console.log(a === '\\n<(42)>\\t - \\n<(name)>\\t');

	let b = `\n${ 40 + 2 }\t - \n<${ name }>\t`;
	console.log(b === '\n42\t - \n<name>\t');

//	let c = String.raw`\n<${ 40 + 2 }>\t - \n<${ name }>\t`;
//	console.log(c === '\\n<42>\\t - \\n<name>\\t' )

	(function() {
		let a1 = test`\n<${ 1 }>\t - \n<${ 2 }>\t`;
		console.log(a1 === '\\n<(1)>\\t - \\n<(2)>\\t');

		let a2 = test`\n<{${ 3 }}>\t - \n<{${ 4 }}>\t`;
		console.log(a2 === '\\n<{(3)}>\\t - \\n<{(4)}>\\t');
	})();
}

{// raw special symbols
	let z0 = test`\0`, b = test`\b`, f = test`\f`, n = test`\n`, r = test`\r`, t = test`\t`, v = test`\v`, bs = test`\\`, q1 = test`"`, q2 = test`'`, q1q1 = test`""`, q2q2 = test`''`, q1_q1q1 = test`"\""`, q2_q2q2 = test`'\''`;
	let string = `${z0}|${b}|${f}|${n}|${r}|${t}|${v}|${bs}|${q1}|${q2}|${q1q1}|${q2q2}|${q1_q1q1}|${q2_q2q2}`;
	console.log(string === "\\0|\\b|\\f|\\n|\\r|\\t|\\v|\\\\|\"|'|\"\"|''|\"\\\"\"|'\\''");
}

{// raw unicode, hex
	let hex = test`\x22\x21\x224`;
	console.log(hex === "\\x22\\x21\\x224");
	let unicode = test`\u2222\u2221\u22449`;
	console.log(unicode === "\\u2222\\u2221\\u22449");
}

{// nested

	filter = function safehtml(val) {
		if( Array.isArray(val) )return val.join("");
		return `${val}`.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;')
	};

	var rows = [['Unicorns', 'Sunbeams', 'Puppies'], ['<3', '<3', '<3']];
	var html = test`<table>${
		rows.map(function(row) {
			return test`<tr>${
				row.map((cell) =>
					test`<td>${cell}</td>`
				)
			}</tr>`
		})
	}</table>`;
	console.log(html === '<table><tr><td>Unicorns</td><td>Sunbeams</td><td>Puppies</td></tr><tr><td>&lt;3</td><td>&lt;3</td><td>&lt;3</td></tr></table>')
}


// Unicode-code-point-escapes
// @see http://mathiasbynens.be/notes/javascript-escapes#unicode-code-point

{// simple
	let ABC = '\u{41}\u{42}\u{43}';
	console.log(ABC === 'ABC');
}

{
	let tetragram1 = "\u{1D306}";
	let tetragram2 = '\u{1D306}';
	let tetragram3 = `\u{1D306}`;
	let tetragram4 = tag`\u{1D306}`;
	console.log(tetragram1 === "\uD834\uDF06");
	console.log(tetragram2 === "\uD834\uDF06");
	console.log(tetragram3 === "\uD834\uDF06");
	console.log(tetragram4 === "\uD834\uDF06");
}

{
	let tetragram1 = "first\u{1D306}";
	let tetragram2 = 'first\u{1D306}';
	let tetragram3 = `first\u{1D306}`;
	let tetragram4 = tag`first\u{1D306}`;
	console.log(tetragram1 === "first\uD834\uDF06");
	console.log(tetragram2 === "first\uD834\uDF06");
	console.log(tetragram3 === "first\uD834\uDF06");
	console.log(tetragram4 === "first\uD834\uDF06");
}

{
	let tetragram1 = "\u00A9\u{1D306}";
	let tetragram2 = '\u00A9\u{1D306}';
	let tetragram3 = `\u00A9\u{1D306}`;
	let tetragram4 = tag`\u00A9\u{1D306}`;
	console.log(tetragram1 === "\u00A9\uD834\uDF06");
	console.log(tetragram2 === "\u00A9\uD834\uDF06");
	console.log(tetragram3 === "\u00A9\uD834\uDF06");
	console.log(tetragram4 === "\u00A9\uD834\uDF06");
}

{
	let tetragram1 = "\u{1D306}second";
	let tetragram2 = '\u{1D306}second';
	let tetragram3 = `\u{1D306}second`;
	let tetragram4 = tag`\u{1D306}second`;
	console.log(tetragram1 === "\uD834\uDF06second");
	console.log(tetragram2 === "\uD834\uDF06second");
	console.log(tetragram3 === "\uD834\uDF06second");
	console.log(tetragram4 === "\uD834\uDF06second");
}

{
	let tetragram1 = "\u{1D306}\u00A9";
	let tetragram2 = '\u{1D306}\u00A9';
	let tetragram3 = `\u{1D306}\u00A9`;
	let tetragram4 = tag`\u{1D306}\u00A9`;
	console.log(tetragram1 === "\uD834\uDF06\u00A9");
	console.log(tetragram2 === "\uD834\uDF06\u00A9");
	console.log(tetragram3 === "\uD834\uDF06\u00A9");
	console.log(tetragram4 === "\uD834\uDF06\u00A9");
}

{// escaped
	let tetragram1 = "\\u{1D306}\\u00A9";
	let tetragram2 = '\\u{1D306}\\u00A9';
	let tetragram3 = `\\u{1D306}\\u00A9`;
	let tetragram4 = tag`\\u{1D306}\\u00A9`;
	console.log(tetragram1 === "\\u{1D306}\\u00A9");
	console.log(tetragram2 === "\\u{1D306}\\u00A9");
	console.log(tetragram3 === "\\u{1D306}\\u00A9");
	console.log(tetragram4 === "\\u{1D306}\\u00A9");
}

function tag(quasis, ...expressionValues) {
	const quasisLen = quasis.length;

	let s = '', i = 0;
	while (true) {
		s += quasis[i];
		if (i + 1 === quasisLen) {
			return s;
		}
		s += expressionValues[i++];
	}
}
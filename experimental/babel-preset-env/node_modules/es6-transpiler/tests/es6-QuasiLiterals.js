let a = "a", b = "b", a$1, b$1;

{// simple
	let a = 1, b = 2;
	console.log(`${a + 1}|${b}` === "2|2")
}

{// with line breaks and \n's
	let a = "3a", b = 4;
	console.log(
		`"${a.toUpperCase()}\"
   ${b + "\\n"}` === "\"3A\"\n   4\\n")
}

{// with function call inside
	let a = "a", b = "b";
	function test1(...rest) {
		return rest;
	}
	let string = `a = ${a} | bb = ${b + b} | function call = ${test1(a, b).join("\n")}`;
	console.log(string === "a = " + a + " | bb = " + b + b + " | function call = " + a + "\n" + b);

	{
		let string = `a = ${a} | bb = ${b + b} | function call = ${test1(a, b, ...["c", "d"]).join("\n")}`;
		console.log(string === "a = a | bb = bb | function call = a\nb\nc\nd");
	}
}

{// with multy function calls inside
	let a = "u-n", b = "b-d";
	function test(a, b) {
		return [a, b];
	}
	let string = `${test(a, b).join("\n")}${test(a, b).join("\t")}'${test(a, b).join("\r")}"${test(a, b).join("\0")}\`${test(a, b).join("\\")}\\/${test(a, b).join("/")}`;
	console.log(string === 'u-n\nb-du-n\tb-d\'u-n\rb-d"u-n\0b-d`u-n\\b-d\\/u-n/b-d');
}

{// escaping
	let str = `\`\`\`\${1}\\${2}$\{3}\$\$\{\{`;
	console.log(str === "```${1}\\2${3}$${{");
}

{// multy lines
	let str = `
		^ # match at start of string only
		/ (?<year> [^/]+ ) # capture top dir as year
		/ (?<month> [^/]+ ) # capture subdir as month
		/ (?<title> [^/]+ ) # file name base
		\\.html? # file name extension: .htm or .html
		$ # end of string
	`;
	console.log(str === "\n\t\t^ # match at start of string only\n\t\t/ (?<year> [^/]+ ) # capture top dir as year\n\t\t/ (?<month> [^/]+ ) # capture subdir as month\n\t\t/ (?<title> [^/]+ ) # file name base\n\t\t\\.html? # file name extension: .htm or .html\n\t\t$ # end of string\n\t");
}

{// special symbols
	let z0 = `\0`, b = `\b`, f = `\f`, n = `\n`, r = `\r`, t = `\t`, v = `\v`, bs = `\\`, q1 = `"`, q2 = `'`, q1q1 = `""`, q2q2 = `''`, q1_q1q1 = `"\""`, q2_q2q2 = `'\''`;
	let string = `${z0}|${b}|${f}|${n}|${r}|${t}|${v}|${bs}|${q1}|${q2}|${q1q1}|${q2q2}|${q1_q1q1}|${q2_q2q2}`;
	console.log(string === "\0|\b|\f|\n|\r|\t|\v|\\|\"|'|\"\"|''|\"\"\"|'''");
}

{// unicode, hex
	let hex = `\x22\x21\x224`;
	console.log(hex === "\x22\x21\x224");
	let unicode = `\u2222\u2221\u22449`;
	console.log(unicode === "\u2222\u2221\u22449");
}

{// just toString
	let obj = {toString(){ return [3, 2, 1].join("") }};
	console.log( `${obj}`.split("").join("") === "321" )
}

{// simple nesting
	let a = 1, b = 2, c = 3, d = 4;
	let str = `${ a + `-${ b + `=${ c + `${d}` }` }` }`;
	console.log(str === a + "-" + b + "=" + c + d);
}

{// complex nesting
	let rows = [['Unicorns', 'Sunbeams', 'Puppies'], ['<3', '<3', '<3']];
	let html = `<table>${
		rows.map(function(row) {
			return `<tr>${
				row.map((cell) =>
					`<td>${cell}</td>`
				)
			}</tr>`
		})
	}</table>`;

	console.log(html === '<table><tr><td>Unicorns</td>,<td>Sunbeams</td>,<td>Puppies</td></tr>,<tr><td><3</td>,<td><3</td>,<td><3</td></tr></table>')
}

/*es6-transpiler includePolyfills:true */

// @see http://mathiasbynens.be/notes/javascript-unicode#astral-ranges
// @see https://github.com/google/traceur-compiler/issues/370

{
	console.log(/foo.bar/u.test('foo?bar'));

	let re = /foo.bar/u, re2 = /foo.bar/;
	console.log(re.unicode === true, re2.unicode === false);
}

{
	// The production Atom :: . evaluates as follows: Let A be the set of all characters except LineTerminator.
	let re = /foo.bar/u;
	console.log(
		re.test('foo\uD83D\uDCA9bar') === true
		, re.test('foo bar') === true
		, re.test('fooAbar') === true
		, re.test('foo1bar') === true
		, re.test('foo\u0009bar') === true && re.test('foo\tbar') === true
		, re.test('foo\u000Abar') === false && re.test('foo\nbar') === false
		, re.test('foo\u000Dbar') === false && re.test('foo\rbar') === false
		, re.test('foo\u2028bar') === false
		, re.test('foo\u2029bar') === false
	)
}

{
	// The production CharacterClassEscape :: s evaluates by returning the set of characters containing the characters that are on the right-hand side of the WhiteSpace (11.2) or LineTerminator (11.3) productions.
	// The production CharacterClassEscape :: S evaluates by returning the set of all characters not included in the set returned by CharacterClassEscape :: s .
	let re = /foo\Sbar/u;
	console.log(
		re.test('foo\uD83D\uDCA9bar') === true
		, re.test('fooAbar') === true
		, re.test('foo1bar') === true
		, re.test('foo bar') === false
		, re.test('foo\u0009bar') === false && re.test('foo\tbar') === false
		, re.test('foo\u000Abar') === false && re.test('foo\nbar') === false
		, re.test('foo\u000Dbar') === false && re.test('foo\rbar') === false
		, re.test('foo\u2028bar') === false
		, re.test('foo\u2029bar') === false
	)
}

{
	console.log(
		/foo.bar/u.test('foo💩bar')
		, /foo[.]|(.)bar/u.test('foo💩bar')
		, /foo(.)bar/u.test('foo💩bar')
		, /foo[\s\S]bar/u.test('foo💩bar')
		, /foo[1-9\s\S]bar/u.test('foo💩bar')
		, /foo[\s\S1-9]bar/u.test('foo💩bar')
		, /foo[\S1-9]bar/u.test('foo💩bar')
		, /foo([1-9\s]|[\S1-9])bar/u.test('foo💩bar')
	);
}

{
	console.log("\uD83D\uDCA9|\uD83D\uDCA9".replace(/(.)\|(\S)/u, "+$1+|-$2-") === "+\uD83D\uDCA9+|-\uD83D\uDCA9-");
}

{
	console.log(/A[\uD83D\uDCA9-\uD83D\uDCAB]A/u.test('A\uD83D\uDCA9A')); // match U+1F4A9

	console.log(/A[\u{1F4A9}-\u{1F4AB}]A/u.test('A\u{1F4A9}A')); // match U+1F4A9

	console.log(/A[💩-💫]A/u.test('A💩A')); // match U+1F4A9

	console.log(/A\uD83D[\uDCA9-\uDCAB]A/u.test('A\uD83D\uDCA9A')); // match U+1F4A9

	console.log(/B[\uD83D\uDCA9-\uD83D\uDCAB]B/u.test('B\uD83D\uDCAAB')); // match U+1F4AA

	console.log(/B[\u{1F4A9}-\u{1F4AB}]B/u.test('B\u{1F4AA}B')); // match U+1F4AA

	console.log(/B[💩-💫]B/u.test('B💪B'));// match U+1F4AA

	console.log(/B\uD83D[\uDCA9-\uDCAB]B/u.test('B\uD83D\uDCA9B')); // match U+1F4A9

	console.log(/C[\uD83D\uDCA9-\uD83D\uDCAB]C/u.test('C\uD83D\uDCABC')); // match U+1F4AB

	console.log(/C[\u{1F4A9}-\u{1F4AB}]C/u.test('C\u{1F4AB}C')); // match U+1F4AB

	console.log(/C[💩-💫]C/u.test('C💫C')); // match U+1F4AB

	console.log(/C\uD83D[\uDCA9-\uDCAB]C/u.test('C\uD83D\uDCA9C')); // match U+1F4A9
}

{
	console.log(/H[a-\uD83D\uDCAB]H/u.test('H\uD83D\uDCA9H'));
	console.log(/H[a-\uD83D\uDCAB]A/u.test('H\uD83D\uDCA9A'));
}

{
	// case: [\u0001-\u0002\u0003]
	console.log(/D[\u0001-\uD83D\uDCAB]D/u.test('D\uD83D\uDCA9D'));
	// case: [a-\u0002\u0003]
	console.log(/D[a-\uD83D\uDCAB]D/u.test('D\uD83D\uDCA9D'));
}

{
	// or
	console.log(/OR[\u0001-\uD83D\uDCAB]|[a-\uD83D\uDCAB]OR/u.test('OR\uD83D\uDCA9OR'));
}

{ // should not match
	console.log(/A[\uD83D\uDCA9-\uD83D\uDCAB]A/u.test('H\uD83D\uDCA9A') === false);

	console.log(/A[\u{1F4A9}-\u{1F4AB}]A/u.test('H\uD83D\uDCA9A') === false);

	console.log(/A[💩-💫]A/u.test('H\uD83D\uDCA9A') === false);

	console.log(/A[\u0001-\uD83D\uDCAB]A/u.test('H\uD83D\uDCA9A') === false);

	console.log(/A[a-\uD83D\uDCAB]A/u.test('H\uD83D\uDCA9A') === false);
}

/* <[tests es6-transpiler test file EOF ]> */
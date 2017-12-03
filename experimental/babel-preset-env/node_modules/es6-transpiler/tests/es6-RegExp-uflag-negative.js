/*es6-transpiler includePolyfills:true */

// @see http://mathiasbynens.be/notes/javascript-unicode#astral-ranges
// @see https://github.com/google/traceur-compiler/issues/370

{// ranges without astral symbols and CharacterClassEscape
	console.log(
		/N[^1]N/u.test('N\uD83D\uDCA9N')    //N(?:[^1]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, /N[^1]N/u.test('N9N')
		, /N[^1]N/u.test('N1N') === false
	);
	console.log(
		/N[^1-9]N/u.test('N\uD83D\uDCA9N')    //N(?:[^1-9]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, /N[^1-9]N/u.test('NAN')
		, /N[^1-9]N/u.test('N1N') === false
	);
}

{// ranges without astral symbols and with CharacterClassEscape
	console.log(
		/N[^\s1-9]N/u.test('N\uD83D\uDCA9N')    //N(?:[^\s1-9]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\s1-9]N/u.test('N9N') === false
		, /N[^\s1-9]N/u.test('N N') === false
		, /N[^\S\t\r]N/u.test('N\uD83D\uDCA9N') === false //N[^\S\t\r]N
		, /N[^\S\t\r]N/u.test('N\tN') === false
		, /N[^\S\t\r]N/u.test('N\rN') === false
		, /N[^\S\t\r]N/u.test('N N')
	);
	console.log(
		/N[^\da-z]N/u.test('N\uD83D\uDCA9N')  //N(?:[^\da-z]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\da-z]N/u.test('N9N') === false
		, /N[^\da-z]N/u.test('NaN') === false
		, /N[^\D1-3]N/u.test('N\uD83D\uDCA9N') === false//N[^\D1-3]N
		, /N[^\D1-3]N/u.test('N9N')
		, /N[^\D1-3]N/u.test('N3N') === false
	);
	console.log(
		/N[^\w-]N/u.test('N\uD83D\uDCA9N')    //N(?:[^\w-]|[\uD800-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\w-]N/u.test('N-N') === false
		, /N[^\w-]N/u.test('NaN') === false
		, /N[^\Wa]N/u.test('N\uD83D\uDCA9N') === false //N[^\Wa]N
		, /N[^\Wa]N/u.test('NbN')
		, /N[^\Wa]N/u.test('NaN') === false
	);
}

{// ranges with astral symbols and CharacterClassEscape
	// /N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u
	// regenerate().addRange(0xFFFF+1, 0x10FFFF).removeRange('\uD800\uDC00', '\uD800\uDCAA')
	// //N(?:[^\s1-9]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N

	console.log(
		/N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u.test('N\uD83D\uDCA9N') //N(?:[^\s1-9]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u.test('N\uD800\uDC01N') === false
		, /N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u.test('N9N') === false
		, /N[^\s\uD800\uDC00-\uD800\uDCAA1-9]N/u.test('N N') === false
		, /N[^\S\uD800\uDC00-\uD800\uDCAA\t\r]N/u.test('N\uD83D\uDCA9N') === false //N[^\S\t\r]N
		, /N[^\S\uD800\uDC00-\uD800\uDCAA\t\r]N/u.test('N\tN') === false
		, /N[^\S\uD800\uDC00-\uD800\uDCAA\t\r]N/u.test('N\rN') === false
		, /N[^\S\uD800\uDC00-\uD800\uDCAA\t\r]N/u.test('N N')
	);
	console.log(
		/N[^\d\uD800\uDC00-\uD800\uDCAAa-z]N/u.test('N\uD83D\uDCA9N')  //N(?:[^\da-z]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\d\uD800\uDC00-\uD800\uDCAAa-z]N/u.test('N\uD800\uDC01N') === false
		, /N[^\d\uD800\uDC00-\uD800\uDCAAa-z]N/u.test('N9N') === false
		, /N[^\d\uD800\uDC00-\uD800\uDCAAa-z]N/u.test('NaN') === false
		, /N[^\D\uD800\uDC00-\uD800\uDCAA1-3]N/u.test('N\uD83D\uDCA9N') === false//N[^\D1-3]N
		, /N[^\D\uD800\uDC00-\uD800\uDCAA1-3]N/u.test('N9N')
		, /N[^\D\uD800\uDC00-\uD800\uDCAA1-3]N/u.test('N3N') === false
	);
	console.log(
		/N[^\w\uD800\uDC00-\uD800\uDCAA-]N/u.test('N\uD83D\uDCA9N')    //N(?:[^\w-]|\uD800[\uDCAB-\uDFFF]|[\uD801-\uDBFF][\uDC00-\uDFFF])N
		, /N[^\w\uD800\uDC00-\uD800\uDCAA-]N/u.test('N\uD800\uDC01N') === false
		, /N[^\w\uD800\uDC00-\uD800\uDCAA-]N/u.test('N-N') === false
		, /N[^\w\uD800\uDC00-\uD800\uDCAA-]N/u.test('NaN') === false
		, /N[^\W\uD800\uDC00-\uD800\uDCAAa-]N/u.test('N\uD83D\uDCA9N') === false //N[^\Wa]N
		, /N[^\W\uD800\uDC00-\uD800\uDCAAa-]N/u.test('NbN')
		, /N[^\W\uD800\uDC00-\uD800\uDCAAa-]N/u.test('NaN') === false
	);
}

{// complex
	console.log(
		/C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('CfC') === false

		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD800\uDC00C') === false//first
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD800\uDC0AC') === false//middle
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD800\uDCAAC') === false//last
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uFFFFC')       //first - 1
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD800\uDCABC') //last + 1

		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD80F\uDCAAC') === false//first
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD8F0\uDCAAC') === false//middle
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD8FF\uDCAAC') === false//last
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD80F\uDCA9C') //first - 1
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uD8FF\uDCABC') //last + 1

		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAA0\uDFFFC') === false//first
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAE0\uDC00C') === false//middle
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAF0\uDFFFC') === false//last
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAA0\uDFFEC') //first - 1
		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAF2\uDC00C') //last + 1

		, /C[^\uD800\uDC00-\uD800\uDCAA\uD80F\uDCAA-\uD8FF\uDCAA\uDAA0\uDFFF-\uDAF0\uDFFFa-z]C/u.test('C\uDAFC\uDFFFC')
	);
}

{// negative
	{
		let re = /N[^\uD83D\uDCA9-\uD83D\uDCAB]N/u;
		console.log(
			re.test('N\uD83D\uDCA9N') === false
			, re.test('NCN')
		);
	}
//	{// TODO:: and or
//		let re = /N([^\uD800\uDC00-\uD800\uDCAA]|[\uD83D\uDCA9-\uD83D\uDCAB])+N/u;
//		console.log(
//			re.test('N\uD83D\uDCA9\uD800\uDC01abcN') === false
//			, re.test('NCN')
//		);
//	}
}

/* <[tests es6-transpiler test file EOF ]> */

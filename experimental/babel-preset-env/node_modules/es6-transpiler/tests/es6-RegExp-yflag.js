/*es6-transpiler includePolyfills:true */
test1();
test2();
test3();
test4();

function test1() {
	
	// Test sticky flag.

	/*
	 * calls to reportCompare invoke regular expression matches which interfere
	 * with the test of the sticky flag. Collect expect and actual values prior
	 * to calling reportCompare. Note setting y = /(1)/y resets the lastIndex etc.
	 */
	var re = /(1)/y, re2 = /(1)/g;
	console.log(re.sticky === true, re2.sticky === false);
	console.log(re instanceof RegExp, re2 instanceof RegExp);
	console.log(re.__proto__ == RegExp.prototype, re2.__proto__ == RegExp.prototype);


	re = /(1)/y;
	var str1 = '1234561';
	var match1 = re.exec(str1);
	var expect1 = 'captures: 0::1::1; RegExp.leftContext: ""; RegExp.rightContext: "234561"';
	var actual1 = 'captures: ' + (match1 == null ? 'null' : match1.index + '::' + match1[0] + '::' + re.lastIndex) +
		'; RegExp.leftContext: "' + RegExp.leftContext +
		'"; RegExp.rightContext: "' + RegExp.rightContext + '"';

	var str2 = '1234561';
	var match2 = re.exec(str2);
	var expect2 = 'captures: null; RegExp.leftContext: ""; RegExp.rightContext: "234561"';
	var actual2 = 'captures: ' + (match2 == null ? 'null' : match2.index + '::' + match2[0] + '::' + re.lastIndex) +
		'; RegExp.leftContext: "' + RegExp.leftContext +
		'"; RegExp.rightContext: "' + RegExp.rightContext + '"';

	console.log(expect1 == actual1, ' - /(1)/y.exec("' + str1 + '") first call');
	console.log(expect2 == actual2, ' - /(1)/y.exec("' + str2 + '") second call');

	re = /(1)/y;
	re.exec(str1);

	re = /(1)/y;
	console.log(re.lastIndex == 0, 'Must be the fresh instance of RegExp');
	var str3 = '1123456';
	var match3 = re.exec(str3);
	var expect3 = 'captures: 0::1::1; RegExp.leftContext: ""; RegExp.rightContext: "123456"';
	var actual3 = 'captures: ' + (match3 == null ? 'null' : match3.index + '::' + match3[0] + '::' + re.lastIndex) +
		'; RegExp.leftContext: "' + RegExp.leftContext +
		'"; RegExp.rightContext: "' + RegExp.rightContext + '"';

	var str4 = '1123456';
	var match4 = re.exec(str4);
	var expect4 = 'captures: 0::1::2; RegExp.leftContext: "1"; RegExp.rightContext: "23456"';
	var actual4 = 'captures: ' + (match4 == null ? 'null' : match4.index + '::' + match4[0] + '::' + re.lastIndex) +
		'; RegExp.leftContext: "' + RegExp.leftContext +
		'"; RegExp.rightContext: "' + RegExp.rightContext + '"';

	console.log(expect3 == actual3, ' - /(1)/y.exec("' + str3 + '") first call');
	console.log(expect4 == actual4, ' - /(1)/y.exec("' + str4 + '") second call');
}

function test2() {
	var text = "First line\nsecond line";
	var regex = /^(\S+) line\n?/y;

	var match = regex.exec(text);
	console.log(match[1] === "First", "should be \"First\"");
	console.log(regex.lastIndex === 11, "should be 11");

	var match2 = regex.exec(text);
	console.log(match2[1] === "second", "should be \"second\"");
	console.log(regex.lastIndex == 22, "should be 22");

	var match3 = regex.exec(text);
	console.log(match3 === null);
}

function test3() {
	var text = "First line\nsecond line";
	var regex = /^(\S+) LINE\n?/gyi;
	console.log(text.replace(regex, "--") == "----");
	console.log(text.match(regex ).join('') == ["First line\n", "second line"].join(''));
}

function test4() {
	var text = "\\\u0078\\\u0078";
	var regex = /^\\\u0078/gyi;
	console.log(text.match(regex).join("|") == ["\\x", "\\x"].join("|"));
}

/* <[tests es6-transpiler test file EOF ]> */
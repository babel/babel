
{// simple
	let obj = {
		[`test`]: `test`
	};
	console.log(obj[`test`] === "test");
}

{// complex
	let obj = {
		[`test1`]: `test1`,[`test2`]:`test2`
		, [`test3`]: "test3",
		[`test4`]: `test4`
	};
	console.log(obj[`test1`] === "test1", obj[`test2`] === "test2", obj[`test3`] === "test3", obj[`test4`] === "test4");
}

{// multyline
	let obj = {
		[`t
e
s
t`]:`t
e
s
t`
	};
	console.log(obj[`t\ne\ns\nt`] === "t\ne\ns\nt");
}

{// escaping
	let obj = {
		[`\${1+1}"'`]: `\${1+1}"'`
	};
	console.log(obj["${1+1}\"'"] === "${1+1}\"'");
}

// -------

{// template simple
	let a = 1;
	let obj = {
		[`test${a}`]: `test${a}`
	};
	console.log(obj["test" + a] === "test" + a);
}

{// template complex
	let a = 1, b = 2, c = 3;
	let obj = {
		[`test${a}`]: `test${a}`,[`test${b}`]:`test${b}`
		, [`test${c}`]: "test" + c,
		[`test${1+2+3-2}`]: `test${4}`
	};
	console.log(obj["test" + a] === "test" + a, obj["test" + b] === "test" + b, obj["test" + c] === "test" + c, obj["test4"] === "test4");
}

{// template multyline
	let a = 1, b = 2, c = 3;
	let obj = {
		[`t
${a}e${b}
s
${c}t`]:`t${a}
e
${b}s${c}
t`
	};
	console.log(obj["t\n" + a + "e" + b + "\ns\n" + c + "t"] === "t" + a + "\ne\n" + b + "s" + c + "\nt");
}

{// template escaping
	let a = 1, b = 2, c = 3;
	let obj = {
		[`${a}\${1+1}${b}"${c}'`]: `${a}\${1+1}${b}"${c}'`
	};
	console.log(obj["1${1+1}2\"3'"] === "1${1+1}2\"3'");
}

// -------

{
	let a = 99, b = a;
	let obj = {
		test1: 1
		, [`test${a}`]: `test${a++}`
		, [`test${a}`]: `test${a++}`
		, test2: 2
		, [`test${a}`]: `test${a++}`
		, test3: ((a) => a)({test: 777})
		, [`test${a}`]: `test${a++}`
	};
	console.log(obj.test1 === 1, obj[`test${b}`] == `test${b++}`, obj[`test${b}`] == `test${b++}`, obj.test2 === 2, obj[`test${b}`] == `test${b++}`, obj.test3.test === 777)
}

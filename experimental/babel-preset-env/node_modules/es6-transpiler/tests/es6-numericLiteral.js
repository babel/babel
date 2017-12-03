
{// simple, lower case
	let binary = 0b111110111;
	console.log(binary === 503);

	let octal = 0o767;
	console.log(binary === 503);
}

{// simple, upper case
	let binary = 0B111110111;
	console.log(binary === 503);

	let octal = 0O767;
	console.log(binary === 503);
}

{// expression
	let res = 0b111110111 + 0o767;
	console.log(res === 503 + 503);
}

{// as property
	let objB = {};
	objB[0b111110111] = 0b111110111;
	console.log(objB[503] === 503);

	let objO = {};
	objO[0o767] = 0o767;
	console.log(objO[503] === 503);
}

{// as property
	let objB = {0b111110111: 0b111110111};
	console.log(objB[503] === 503);

	let objO = {0o767: 0o767};
	console.log(objO[503] === 503);
}

{// comples expression
	let obj = {};
	let res;res = (res = 0b111110111) + res + ((obj[0o767] = 0o767),obj)[0o767];
	console.log(res === 503 + 503 + 503);
}

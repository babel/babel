
{// simple, lower case
	var binary = 503;
	console.log(binary === 503);

	var octal = 503;
	console.log(binary === 503);
}

{// simple, upper case
	var binary$0 = 503;
	console.log(binary$0 === 503);

	var octal$0 = 503;
	console.log(binary$0 === 503);
}

{// expression
	var res = 503 + 503;
	console.log(res === 503 + 503);
}

{// as property
	var objB = {};
	objB[503] = 503;
	console.log(objB[503] === 503);

	var objO = {};
	objO[503] = 503;
	console.log(objO[503] === 503);
}

{// as property
	var objB$0 = {503: 503};
	console.log(objB$0[503] === 503);

	var objO$0 = {503: 503};
	console.log(objO$0[503] === 503);
}

{// comples expression
	var obj = {};
	var res$0 = void 0;res$0 = (res$0 = 503) + res$0 + ((obj[503] = 503),obj)[503];
	console.log(res$0 === 503 + 503 + 503);
}


{
	var test11 = [1, 2, 3];
	var [...test12] = test11;
	test11.push(4);
	console.log(test11.join("|") === "1|2|3|4", test12.join("|") === "1|2|3");
}

{
	var [...test21] = [1, 2, 3];
	console.log(test21.join("|") === "1|2|3");
}

{
	var test31;
	[...test31] = [1, 2, 3];
	console.log(test31.join("|") === "1|2|3");

	{
		var test321, test322, test323;
		test322 = ([...test321] = test323 = [1, 2, 3]);
		test322.push(4);
		console.log(test31.join("|") === "1|2|3", test322.join("|") === "1|2|3|4", test322 === test323);
	}
}

{
	var test41 = [1, 2, 3];
	var test42;
	[...test42] = test41;
	test41.push(4);
	console.log(test41.join("|") === "1|2|3|4", test42.join("|") === "1|2|3");

	{
		var test43 = [1, 2, 3];
		var test44 = [ ...test43 ];
		console.log(test44.join("|") === "1|2|3");
	}
}

{
	var test51 = [0, 1, 2, 3];
	var test52, test53;
	[test53, ...test52] = test51;
	test51.shift();
	test51.push(4);
	console.log(test51.join("|") === "1|2|3|4", test52.join("|") === "1|2|3");
}

{
	var test61 = [3, 2, 1], test63 = test61;
	var [[...test62]] = [test61.reverse()];
	test61.push(4);
	console.log(test61.join("|") === "1|2|3|4", test62.join("|") === "1|2|3", test63 === test61);
}

{
	var test71 = [3, 2, 1];
	var [[...test72]] = [test71.reverse()];
	console.log(test72.join("|") === "1|2|3");

	{
		[[...test72]] = [test71.reverse()];
		console.log(test72.join("|") === "3|2|1");
	}
}

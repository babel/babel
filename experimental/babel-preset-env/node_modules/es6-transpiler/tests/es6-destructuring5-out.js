var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var SLICE$0 = Array.prototype.slice;var $D$0;
{
	var test11 = [1, 2, 3];
	var test12 = SLICE$0.call(test11, 0);
	test11.push(4);
	console.log(test11.join("|") === "1|2|3|4", test12.join("|") === "1|2|3");
}

{
	var test21 = SLICE$0.call(([1, 2, 3]), 0);
	console.log(test21.join("|") === "1|2|3");
}

{
	var test31;
	test31 = SLICE$0.call(($D$0 = [1, 2, 3]), 0), $D$0;
	console.log(test31.join("|") === "1|2|3");

	{
		var test321, test322, test323;
		test322 = (test321 = SLICE$0.call(($D$0 = test323 = [1, 2, 3]), 0), $D$0);
		test322.push(4);
		console.log(test31.join("|") === "1|2|3", test322.join("|") === "1|2|3|4", test322 === test323);
	}
}

{
	var test41 = [1, 2, 3];
	var test42;
	test42 = SLICE$0.call(test41, 0), test41;
	test41.push(4);
	console.log(test41.join("|") === "1|2|3|4", test42.join("|") === "1|2|3");

	{
		var test43 = [1, 2, 3];
		var test44 = ITER$0(test43 );
		console.log(test44.join("|") === "1|2|3");
	}
}

{
	var test51 = [0, 1, 2, 3];
	var test52, test53;
	test53 = test51[0], test52 = SLICE$0.call(test51, 1), test51;
	test51.shift();
	test51.push(4);
	console.log(test51.join("|") === "1|2|3|4", test52.join("|") === "1|2|3");
}

{
	var test61 = [3, 2, 1], test63 = test61;
	var test62 = SLICE$0.call(([test61.reverse()])[0], 0);
	test61.push(4);
	console.log(test61.join("|") === "1|2|3|4", test62.join("|") === "1|2|3", test63 === test61);
}

{
	var test71 = [3, 2, 1];
	var test72 = SLICE$0.call(([test71.reverse()])[0], 0);
	console.log(test72.join("|") === "1|2|3");

	{
		test72 = SLICE$0.call(($D$0 = [test71.reverse()])[0], 0), $D$0;
		console.log(test72.join("|") === "3|2|1");
	;$D$0 = void 0}
}

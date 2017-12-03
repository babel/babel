var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};{
	var a = [1, 2, 3, 4, , , [5, 6],7];
	console.log(a.join("|") == "1|2|3|4|||5,6|7");
}

{
	var b = [5, 6], c = [7, 8];
	var a$0 = [parseInt("1qwe")].concat(ITER$0((function(){var a = arguments[0];if(a === void 0)a = 2;var b = arguments[1];if(b === void 0)b = 3; return [a, b] })()), [4, b, c]);
	console.log(a$0.join("|") == "1|2|3|4|5,6|7,8");
}

{
	var b$0 = [6, 7, 8];
	var a$1 = [1,2, 3, 4, 5].concat((new Array(2)), ITER$0(b$0, true), [(function(x){return [9,x]})(10)]);//Important: there is two holes before 'b' spread
	console.log(a$1.join("|") == "1|2|3|4|5|||6|7|8|9,10");
}

{
	var g1 = "7", g2 = "8";
	var a$2 = [("0", false, "1") | 0, +"2", (false, "3"), +parseFloat("4.5float"), (true ? "5" : 0), 6, g1, g1 && g2];
	console.log(a$2.join("|") == "1|2|3|4.5|5|6|7|8");
}

{
	var a$3 = [1, 2, 3, (1 ? 4 : 0), (5)];
	console.log(a$3.join("|") == "1|2|3|4|5");
}

{
	var a$4 =  [] ;
	console.log(a$4.join("|") == "");
}

{
	var a$5 = ITER$0((function(a){return [a, 2, 3]})(1)) ;
	console.log(a$5.join("|") == [1, 2, 3].join("|"));
}

{
	var a$6 = [1].concat(ITER$0((function(a){return [a, 3, 4]})(2))) ;
	console.log(a$6.join("|") == [1, 2, 3, 4].join("|"));
}

{
	var a$7 = [, , [88]];
	console.log(a$7.join("|") == [, , [88]].join("|"));
}


{
	var b$1 = [5], c$0 = [6, 7], d = [10, 11], e = [12, 13];
	var a$8 = [ ].concat(ITER$0((function(){return [1, 2, 3]})()), [4, b$1, c$0], ITER$0((function(){return [8, 9]})()), [d, e]);
	console.log(a$8.join("|") == [1, 2, 3, 4, [5], [6, 7], 8, 9, [10, 11], [12, 13]].join("|"));
}

{
	var a$9 = (new Array(2)).concat([].concat(ITER$0((function(a){return [a, 2, 3]})(1))));
	console.log(a$9.join("|") == [, , 1, 2, 3].join("|"));
}

{
	var arr1 = [1], arr2 = [5];
	function fun1(){var x = arguments[0];if(x === void 0)x = 0; return 2 + x }
	function fun2(){ arr1.push(3); return arr1[arr1.length - 1]; }

	var a$10 = [ ].concat(ITER$0(arr1, true), [fun1(), fun2(), fun1["call"](null, 2)], ITER$0(arr2), [{arr2: arr2, toString: function(){return this.arr2[0]+1}}, arr2] );
	a$10[5] = a$10[5].arr2[0] + 1;
	a$10[6]++;
	a$10[6]++;
	console.log( a$10.join("|") === [1, 2, 3, 4, 5, 6, 7].join("|") );
}

{
	var arr = [1,2,3];
	arr = ITER$0(arr);
	console.log(arr.join("|") == [1,2,3].join("|"));
}

{
	var arr$0 = [1,2,3];
	arr$0 = ITER$0((arr$0));
	console.log(arr$0.join("|") == [1,2,3].join("|"));
}

{
	var arr$1 = [1,2,3];
	arr$1 = [ ].concat(ITER$0(arr$1), ITER$0(arr$1));
	console.log(arr$1.join("|") == [1,2,3,1,2,3].join("|"));
}

{
	var arr$2 = [1,2,3];
	arr$2 = [ ].concat(ITER$0((arr$2)), ITER$0((arr$2)));
	console.log(arr$2.join("|") == [1,2,3,1,2,3].join("|"));
}

var DP$0 = Object.defineProperty;var DPS$0 = Object.defineProperties;var GOPDS_P$0 = function(o){var d=Object.create(null);for(var p in o)if(o.hasOwnProperty(p)){d[p]={"value":o[p],"enumerable":true,"configurable":true,"writable":true};}return d;};
{// simple
	var obj = DP$0({},
		("test"),{"value": ("test"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj[("test")] === "test");
}

{// complex
	var obj$0 = DP$0(DP$0(DP$0(DP$0({},
		("test1"),{"value": ("test1"),"configurable":true,"enumerable":true,"writable":true}),("test2"),{"value":("test2"),"configurable":true,"enumerable":true,"writable":true})
		, ("test3"),{"value": "test3","configurable":true,"enumerable":true,"writable":true}),
		("test4"),{"value": ("test4"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$0[("test1")] === "test1", obj$0[("test2")] === "test2", obj$0[("test3")] === "test3", obj$0[("test4")] === "test4");
}

{// multyline
	var obj$1 = DP$0({},
		("t\
\ne\
\ns\
\nt"),{"value":("t\
\ne\
\ns\
\nt"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$1[("t\ne\ns\nt")] === "t\ne\ns\nt");
}

{// escaping
	var obj$2 = DP$0({},
		("${1+1}\"'"),{"value": ("${1+1}\"'"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$2["${1+1}\"'"] === "${1+1}\"'");
}

// -------

{// template simple
	var a = 1;
	var obj$3 = DP$0({},
		("test" + a),{"value": ("test" + a),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$3["test" + a] === "test" + a);
}

{// template complex
	var a$0 = 1, b = 2, c = 3;
	var obj$4 = DP$0(DP$0(DP$0(DP$0({},
		("test" + a$0),{"value": ("test" + a$0),"configurable":true,"enumerable":true,"writable":true}),("test" + b),{"value":("test" + b),"configurable":true,"enumerable":true,"writable":true})
		, ("test" + c),{"value": "test" + c,"configurable":true,"enumerable":true,"writable":true}),
		("test" + (1+2+3-2)),{"value": ("test" + (4)),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$4["test" + a$0] === "test" + a$0, obj$4["test" + b] === "test" + b, obj$4["test" + c] === "test" + c, obj$4["test4"] === "test4");
}

{// template multyline
	var a$1 = 1, b$0 = 2, c$0 = 3;
	var obj$5 = DP$0({},
		(("t\
\n" + a$1) + ("e" + b$0) + ("\
\ns\
\n" + c$0) + "t"),{"value":(("t" + a$1) + ("\
\ne\
\n" + b$0) + ("s" + c$0) + "\
\nt"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$5["t\n" + a$1 + "e" + b$0 + "\ns\n" + c$0 + "t"] === "t" + a$1 + "\ne\n" + b$0 + "s" + c$0 + "\nt");
}

{// template escaping
	var a$2 = 1, b$1 = 2, c$1 = 3;
	var obj$6 = DP$0({},
		(("" + a$2) + ("${1+1}" + b$1) + ("\"" + c$1) + "'"),{"value": (("" + a$2) + ("${1+1}" + b$1) + ("\"" + c$1) + "'"),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$6["1${1+1}2\"3'"] === "1${1+1}2\"3'");
}

// -------

{
	var a$3 = 99, b$2 = a$3;
	var obj$7 = DP$0(DPS$0(DP$0(DPS$0(DP$0(DP$0({
		test1: 1}
		, ("test" + a$3),{"value": ("test" + (a$3++)),"configurable":true,"enumerable":true,"writable":true})
		, ("test" + a$3),{"value": ("test" + (a$3++)),"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_P$0({test2: 2}))
		, ("test" + a$3),{"value": ("test" + (a$3++)),"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_P$0({test3: (function(a)  {return a})({test: 777})}))
		, ("test" + a$3),{"value": ("test" + (a$3++)),"configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj$7.test1 === 1, obj$7[("test" + b$2)] == ("test" + (b$2++)), obj$7[("test" + b$2)] == ("test" + (b$2++)), obj$7.test2 === 2, obj$7[("test" + b$2)] == ("test" + (b$2++)), obj$7.test3.test === 777)
}

// About: objectLiteral's and destructuring transpiling

{// properties
	var A = void 0, B = void 0, C = void 0;
	var A$0 = 11, B$0 = 21, C$0 = 31;

	{
		var A$1 = (C$1 = ([{A: A$0, B: B$0, C: C$0}])[0]).A, B$1 = C$1.B, C$1 = C$1.C;
		console.log(A$1 === 11, B$1 === 21, C$1 === 31)
	}

}

{// properties & default values
	var A$2 = void 0, B$2 = void 0, C$2 = void 0;
	var A$0$0 = 12, B$0$0 = 22, C$0$0 = 33;

	{
		var A$3 = ((A$3 = (C$3 = ([{A: A$0$0, B: B$0$0}])[0]).A) === void 0 ? 111 : A$3), B$3 = ((B$3 = C$3.B) === void 0 ? 222 : B$3), C$3 = ((C$3 = C$3.C) === void 0 ? 333 : C$3);
		console.log(A$3 === 12, B$3 === 22, C$3 === 333)
	}

}

{// computed properties & arrow function & string template
	var A$4 = void 0, B$4 = void 0, C$4 = void 0;
	var A$0$1 = 13, B$0$1 = 23, C$0$1 = 33;
	var prop = "B";

	{
		var A$5 = (D = ([{A: A$0$1, B: B$0$1, C: C$0$1, D: C$0$1 + 10}])[0])["A"], B$5 = D[prop], C$5 = D[(function(){return "C"})()], D = D[("" + ("D"))];
		console.log(A$5 === 13, B$5 === 23, C$5 === 33, D === 43)
	}

}
// TODO::
//
//{// computed properties & default values & arrow function & string template
//	let A, B, C;
//	let A$0 = 14, B$0 = 24, C$0 = 34;
//
//	{
//		let [{["A"]: A = 111, [prop]: B = 222, [(()=>"C")()]: C = 333}, [`${"D"}`]: D = 444] = [{A: A$0, B: B$0, C: C$0}];
//		console.log(A === 14, B === 24, C === 34, D === 444)
//	}
//
//}

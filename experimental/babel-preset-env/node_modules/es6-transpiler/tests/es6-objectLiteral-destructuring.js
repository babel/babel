// About: objectLiteral's and destructuring transpiling

{// properties
	let A, B, C;
	let A$0 = 11, B$0 = 21, C$0 = 31;

	{
		let [{A, B, C}] = [{A: A$0, B: B$0, C: C$0}];
		console.log(A === 11, B === 21, C === 31)
	}

}

{// properties & default values
	let A, B, C;
	let A$0 = 12, B$0 = 22, C$0 = 33;

	{
		let [{A = 111, B = 222, C = 333}] = [{A: A$0, B: B$0}];
		console.log(A === 12, B === 22, C === 333)
	}

}

{// computed properties & arrow function & string template
	let A, B, C;
	let A$0 = 13, B$0 = 23, C$0 = 33;
	let prop = "B";

	{
		let [{["A"]: A, [prop]: B, [(()=>"C")()]: C, [`${"D"}`]: D}] = [{A: A$0, B: B$0, C: C$0, D: C$0 + 10}];
		console.log(A === 13, B === 23, C === 33, D === 43)
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

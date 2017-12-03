{
	let a = [1, ...[2, 3], 4, , , [5, 6],...[7]];
	console.log(a.join("|") == "1|2|3|4|||5,6|7");
}

{
	let b = [5, 6], c = [7, 8];
	let a = [...[parseInt("1qwe")], ...(function(a = 2, b = 3){ return [a, b] })(), ...[4], b, c];
	console.log(a.join("|") == "1|2|3|4|5,6|7,8");
}

{
	let b = [6, 7, 8];
	let a = [1,...[2, 3], 4, 5, , , ...b, (x=>[9,x])(10)];//Important: there is two holes before 'b' spread
	console.log(a.join("|") == "1|2|3|4|5|||6|7|8|9,10");
}

{
	var g1 = "7", g2 = "8";
	let a = [("0", false, "1") | 0, +"2", ...[(false, "3")], +parseFloat("4.5float"), (true ? "5" : 0), ...[6, g1, g1 && g2]];
	console.log(a.join("|") == "1|2|3|4.5|5|6|7|8");
}

{
	let a = [1, ...[...[2, 3, ...[(1 ? 4 : 0), (5)]]]];
	console.log(a.join("|") == "1|2|3|4|5");
}

{
	let a =  [...[...[...[]]]] ;
	console.log(a.join("|") == "");
}

{
	let a = [...(a=>[a, 2, 3])(1)] ;
	console.log(a.join("|") == [1, 2, 3].join("|"));
}

{
	let a = [1, ...(a=>[a, 3, 4])(2)] ;
	console.log(a.join("|") == [1, 2, 3, 4].join("|"));
}

{
	let a = [...[], ...[...[]], [...[88]]];
	console.log(a.join("|") == [, , [88]].join("|"));
}


{
	let b = [5], c = [6, 7], d = [10, 11], e = [12, 13];
	let a = [...(()=>[1, 2, 3])(), 4, b, c, ...(()=>[8, 9])(), d, e];
	console.log(a.join("|") == [1, 2, 3, 4, [5], [6, 7], 8, 9, [10, 11], [12, 13]].join("|"));
}

{
	let a = [ , , ...(a=>[a, 2, 3])(1)];
	console.log(a.join("|") == [, , 1, 2, 3].join("|"));
}

{
	let arr1 = [1], arr2 = [5];
	function fun1(x = 0){ return 2 + x }
	function fun2(){ arr1.push(3); return arr1[arr1.length - 1]; }

	let a = [...arr1, fun1(), fun2(), fun1["call"](null, 2),...arr2, {arr2, toString(){return this.arr2[0]+1}}, ...[arr2] ];
	a[5] = a[5].arr2[0] + 1;
	a[6]++;
	a[6]++;
	console.log( a.join("|") === [1, 2, 3, 4, 5, 6, 7].join("|") );
}

{
	let arr = [1,2,3];
	arr = [...[...arr]];
	console.log(arr.join("|") == [1,2,3].join("|"));
}

{
	let arr = [1,2,3];
	arr = [...[...(arr)]];
	console.log(arr.join("|") == [1,2,3].join("|"));
}

{
	let arr = [1,2,3];
	arr = [...[...arr], ...[...arr]];
	console.log(arr.join("|") == [1,2,3,1,2,3].join("|"));
}

{
	let arr = [1,2,3];
	arr = [...[...(arr)], ...[...(arr)]];
	console.log(arr.join("|") == [1,2,3,1,2,3].join("|"));
}
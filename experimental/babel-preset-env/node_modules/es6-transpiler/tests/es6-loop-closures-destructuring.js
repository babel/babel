var e;
let a = 1, b = 2, c = 3;

{// for-of / destructuring / loop closure / arrow function
	e = [];
	for( let {a, b} of [{a: 1, b: 2}, {a: 11, b: 22}, {a: 111, b: 222}] ) {
		e.push( () => a + b )
	}

	console.log(e.map( function(x) {return x()} ).join("|") === "3|33|333")
}

{// for-of / destructuring / loop closure / arrow function #2
	e = [];
	for( let { childrens: [ firstChild ] } of [
		     { childrens: [ 1         , 2] }
		   , { childrens: [ 2         , 3] }
		   , { childrens: [ 3         , 4] }
	] ) {
		e.push( () => firstChild )
	}

	console.log(e.map( function(x) {return x()} ).join("|") === "1|2|3")
}

{// destructuring inside loop closure
	e = [];
	let a = 3, c;
	while( (c = a--) > 0 ) {
		let {a, b} = {a: c, b: c * 100}
		e.push( function() {return a + b} )
	}
	console.log(e.map( function(x) {return x()} ).join("|") === "303|202|101")
}

{
	let someArray = [{b:0}, {b:1}, {b:2}];
	let str1 = "";
	for( let a of someArray ) {
		let { b, c } = a;

		function test2() {
			str1 += b;// variable 'b' has been captured
		}

		test2();
	}
	console.log(str1 === "012");
}

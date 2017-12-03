// Destructuring: The initializer must be an object.
{
	let {x} = 1;// transpiling-time error
	let a = 1;
	let {y} = a;// runtime error
}

// Esprima#harmony: Error: Line 1: Invalid left-hand side in formals list
function A({b:{a} = {}}){};

// Powerfull array comprehantions
var arr = [1]
var arr1 = [2,3]
var aa = [ for (i of arr) if(i==2) for (i1 of arr1) if(i1==2)i * i];


// Forbidden destructuring
{
      var test51 = [3, 2, 1];
      var [...[...test52]] = [test51.reverse()];
      test51.push(4);
      console.log(test51.join("|") === "1|2|3|4", test52.join("|") === "1|2|3");
}

// ---------------------------------------------------

// Esprima support #1
let obj = {
	test: (function({a = 1} = {}){
		let d = 123, res;
		{
			let d = 888;
			let {a: h, b} = {a, b: ([c] = [...(([a])=>[a])([a + d]),1,2])}
			res = ([1, 2, ...b, h, d]);
		}
		return res.join("|") + "|" + d
	})()
}

// Esprima support #2
var fff = ({x = (() => 1)()}) => (x);

// ---------------------------------------------------

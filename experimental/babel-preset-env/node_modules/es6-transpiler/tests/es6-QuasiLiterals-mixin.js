
let arr = [1, 2, 3, 4, 5, 6], obj = { arr, method(){ return `value` } };

{// array comprehentions
	let str = `${[for(i of arr) i + 1].join(`|`)}`;
	console.log(str === [2, 3, 4, 5, 6, 7].join("|"));
	
	{
		let str = `<<{${[for(i of arr) i + 1].join(`|`)}}>>`;
		console.log(str === "<<{" + [2, 3, 4, 5, 6, 7].join("|") + "}>>");
	}
}

{// compound with spread inside
	let a = "a", b = "b";
	function test(...rest) {
		return rest.join("\n");
	}
	let string = `a = ${a} | bb = ${b + b} | function call = ${test(...[a, b, "c", ...["d"]])}`;
	console.log(string === "a = a | bb = bb | function call = a\nb\nc\nd");
}

{// compound with object literals inside
	let a = "a", b = "b";
	let string = `{a, b} = ${JSON.stringify({a, b})} | {A: a, B: b} = ${JSON.stringify({A: a, B: b})} | {a, b, method}.method() = ${{a, b, method(){ return "c" }}.method()}`;
	console.log(string === '{a, b} = {"a":"a","b":"b"} | {A: a, B: b} = {"A":"a","B":"b"} | {a, b, method}.method() = c');
}

{// array destructuring assignment
	let a = 1, b = 9;
	let str = `${[a, b] = [b, a]}`;
	console.log(str === [a, b] + "", a === 9, b === 1);
}

{// array destructuring assignment
	let a = 1, b = 9;
	let str = `<<{${[a, b] = [b, a]}}>>`;
	console.log(str === "<<{" + [a, b] + "}>>", a === 9, b === 1);
}

{// array destructuring assignment
	let a = 1, b = [9];
	let str = `<<{${[[a], b] = [b, a]}}>>`;
	console.log(str === "<<{" + [a, b] + "}>>", a === 9, b === 1);
}

{// array destructuring rest
	let str = `${[...arr]}`;
	console.log(str === "" + arr);
}

{// object destructuring & shorthand
	let a = 1, b = 9, c = 5;
	let obj;
	let str = `${obj = ({a: b, b: a, c}) = {a, b, c, toString(){ return `${this.a}|${this.b}|${this.c}` }}}`;
	console.log(str === obj.a + "|" + obj.b + "|" + obj.c, a === 9, b === 1, c === 5);
}

{// function inside
	{// just call
		let str = `${(function(){ return arr.join(`1`) })()}`;
		console.log(str === arr.join(`1`));
	}
	
	{// rest & spread
		let str = `${(function(...rest){ return rest.join(`2`) })(...arr)}`;
		console.log(str === arr.join(`2`));	
	}
}

{// arrow function inside
	{
		let str = `
string${ ( (x = 1) => x + 2 )() }string${ ( (x = 1, ...rest) => x + 2 + rest.join("") )(2, 3, 4) }string\n`;
		console.log(str === '\nstring3string434string\n');
	}

	{// tagged
		let simpleTag = (quasis, ...expressions) => {
			let {length} = quasis;

			length |= 0;

			if ( length === 0 ) {
				return '';
			}

			let s = '', i = 0;
			while ( true ) {
				s += quasis[i];
				if ( i + 1 === length ) {
					return s;
				}
				s += arguments[++i];
			}
		};
		let str = simpleTag`
string${ ( (x = 1) => x + 2 )() }string${ ( (x = 1, ...rest) => x + 2 + rest.join("") )(2, 3, 4) }string\n`;
		console.log(str === '\nstring3string434string\n');
	}
}
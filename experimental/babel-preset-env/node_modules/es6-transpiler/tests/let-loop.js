let a = 1;
{
	let arr = [];
	for( let a = 0 ; a < 2 ; a++ ) {
		let value;

		if( a === 0 ) {
			value = 1;
		}

		arr.push(value);
	}
	console.log(arr[0] === 1, arr[1] === void 0)
}
console.log(a === 1);

{
	let arr = [];
	for( let a in {a: void 0} ) if(a === "a") {
		arr.push(a);
	}
	console.log(arr[0] === "a")
}

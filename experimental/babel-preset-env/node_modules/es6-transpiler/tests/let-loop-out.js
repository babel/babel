var a = 1;
{
	var arr = [];
	for( var a$0 = 0 ; a$0 < 2 ; a$0++ ) {
		var value = void 0;

		if( a$0 === 0 ) {
			value = 1;
		}

		arr.push(value);
	}
	console.log(arr[0] === 1, arr[1] === void 0)
}
console.log(a === 1);

{
    var arr$0 = [];
    for( var a$1 in {a: void 0} ) if(a$1 === "a") {
        arr$0.push(a$1);
    }
    console.log(arr$0[0] === "a")
}

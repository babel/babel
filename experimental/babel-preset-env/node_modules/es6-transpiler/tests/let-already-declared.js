"use strict";

var x = 3;
let x = 4;
const x = 5;

function f() {
    let f = 1;
    function f() {
    }

    const y = 1;
    if (1) {
        var y;
    }
}

{
	function test1(){return 1}

	let test1;
}

{
	function test2(){return 1}

	for( let {test2} of [] ) {

	}
}

try {
	throw 123;
}
catch(e) {
	let e = 321;
}
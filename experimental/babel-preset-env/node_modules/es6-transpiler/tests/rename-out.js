"use strict";
var x = "x";
function named_fn1(a, b) {
    if (true) {
        (function() {
            console.log(x === 'x');
        })();
    }

    var arr = [];
    // let x must be renamed or else it will shadow the reference on line 5
    for (var x$0 = 0; x$0 < 2; x$0++) {
        arr.push(x$0);
    }
    console.log(arr.join('|') === [0, 1].join('|'));
}
named_fn1();


function test() {
    var x = "x";
    function named_fn2(a, b) {
        if (true) {
            (function() {
                console.log( (a + b) === 2);
            })();
        }

        var arr = [];
        // let x must be renamed or else it will shadow the reference on line 5
        for (var x = 0; x < 2; x++) {
            arr.push(x);
        }
        console.log(arr.join('|') === [0, 1].join('|'));
    }
    named_fn2(1, 1);
}
test();

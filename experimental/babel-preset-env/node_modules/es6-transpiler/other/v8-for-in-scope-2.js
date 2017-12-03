"use strict";

// v8 --harmony correctly prints 9 9 9:
// note that the loop terminates

var arr = [];
for (let x in [0,1,2]) {
    let x = 9;
    arr.push(function() {
        console.log(x);
    });
}
arr.forEach(function(f) { f(); });

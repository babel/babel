"use strict";

// v8 --harmony correctly prints 0 1 2:
// firefox 23 correctly prints 2 2 2:

var arr = [];
for (let x in [0,1,2]) {
    arr.push(function() {
        console.log(x);
    });
}
arr.forEach(function(f) { f(); });

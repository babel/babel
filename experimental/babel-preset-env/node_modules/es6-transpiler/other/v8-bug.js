"use strict";

// https://code.google.com/p/v8/issues/detail?id=2560
// v8 --harmony should print 0 1 2 (not 3 3 3) when executing:

var arr = [];
for (let x = 0; x < 3; x++) {
    arr.push(function() {
        console.log(x);
    });
}
arr.forEach(function(f) { f(); });

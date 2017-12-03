"use strict";
var arr, loop, call = function(callback){ return callback() };

// can be transformed (common WAT)
arr = [];
for (var x = 0; x < 4; x++) {
    arr.push(function() { return x; });
}
console.log(arr.map(call).join("|") == [4, 4, 4, 4].join("|"));

// can be transformed (common manual work-around)
arr = [];
for (let x in [0,1,2]) {
    arr.push((function(x) { return function() { return x; } })(x));
}
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// can be transformed (no extra IIFE will be inserted)
arr = [];
for (let x = 0; x < 3; x++) {(function(){
    let y = 1;
    arr.push(function() { return y; });
}).call(this);}
console.log(arr.map(call).join("|") == [1,1,1].join("|"));

// can be transformed (added IIFE)
arr = [];
for (let x = 0; x < 3; x++) {
    let y = 1;
	let z = x;
    arr.push(function() { return y + z; });
}
console.log(arr.map(call).join("|") == [1,2,3].join("|"));

// can be transformed (added IIFE)
arr = [];
for (let x = 0; x < 3; x++) {
    let {y, k, t} = {y: x}, z = x;
    arr.push(function() { return y + z; });
}
console.log(arr.map(call).join("|") == [0,2,4].join("|"));

// can be transformed (added IIFE)
arr = [];
for (let x = 0; x < 3; x++) {
    let y = x, z = arr.push(function() { return y; });
}
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// can be transformed (added IIFE)
arr = [];
for (let x = 0; x < 3; x++) {
    let x = 1;
    arr.push(function() { return x; });
}
console.log(arr.map(call).join("|") == [1,1,1].join("|"));

// can be transformed (added IIFE)
arr = [];
while (true) {
    let f = function() {
        for (let x = 0; x < 4; x++) {
            let y = x;
            arr.push(function() { return y; });
        }
    };
    f();
	break;
}
console.log(arr.map(call).join("|") == [0,1,2,3].join("|"));

loop = 2;
// it's fine to use break, continue, return and arguments as long as
// it's contained within a function below the loop so that it doesn't
// interfere with the inserted IIFE
arr = [];
(function() {
    for (let x = 0; x < 3; x++) {
        let y = x;
        (function() {
            for(;loop-- > 0;) break;
            return;
        })();
        (function() {
            for(;loop-- > 0;) continue;
            arguments
        })();
        arr.push(function() { return y; });
    }
})();
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// For-In
arr = [];var val;
for (let x in (val = [0,1,2])) if(val.hasOwnProperty(x)) {
    arr.push(function() { return x; });
}
console.log(arr.map(call).join("|") == Object.keys(val).join("|"));

// Block-less For-In
arr = [];
for (let x in [0,1,2]) arr.push(function() { return x; });/*with semicolon*/
for (let x in [0,1,2]) arr.push(function() { return x; })/*no semicolon*/

null; // previous semicolon-less for statement's range ends just before 'n' in 'null'
console.log(arr.map(call).join("|") == [0, 1, 2, 0, 1, 2].join("|"));

// While
arr = [];loop = 2;
while (loop--) {
    let x = 1;
    arr.push(function() { return x; });
}
console.log(arr.map(call).join("|") == [1, 1].join("|"));

// Do-While
arr = [];loop = 2;
do {
    let x = 1;
    arr.push(function() { return x; });
} while (loop--);
console.log(arr.map(call).join("|") == [1, 1, 1].join("|"));

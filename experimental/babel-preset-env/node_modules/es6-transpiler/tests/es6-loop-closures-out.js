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
for (var x$0 in [0,1,2]) {
    arr.push((function(x) { return function() { return x; } })(x$0));
}
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// can be transformed (no extra IIFE will be inserted)
arr = [];
for (var x$1 = 0; x$1 < 3; x$1++) {(function(){
    var y = 1;
    arr.push(function() { return y; });
}).call(this);}
console.log(arr.map(call).join("|") == [1,1,1].join("|"));

// can be transformed (added IIFE)
arr = [];
for (var x$2 = 0; x$2 < 3; x$2++) {(function(){
    var y = 1;
        var z = x$2;
    arr.push(function() { return y + z; });
})();}
console.log(arr.map(call).join("|") == [1,2,3].join("|"));

// can be transformed (added IIFE)
arr = [];
for (var x$3 = 0; x$3 < 3; x$3++) {(function(){
    var y = (t = {y: x$3}).y, k = t.k, t = t.t, z = x$3;
    arr.push(function() { return y + z; });
})();}
console.log(arr.map(call).join("|") == [0,2,4].join("|"));

// can be transformed (added IIFE)
arr = [];
for (var x$4 = 0; x$4 < 3; x$4++) {(function(){
    var y = x$4, z = arr.push(function() { return y; });
})();}
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// can be transformed (added IIFE)
arr = [];
for (var x$5 = 0; x$5 < 3; x$5++) {(function(){
    var x = 1;
    arr.push(function() { return x; });
})();}
console.log(arr.map(call).join("|") == [1,1,1].join("|"));

// can be transformed (added IIFE)
arr = [];
while (true) {
    var f = function() {
        for (var x = 0; x < 4; x++) {(function(){
            var y = x;
            arr.push(function() { return y; });
        })();}
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
    for (var x = 0; x < 3; x++) {(function(){
        var y = x;
        (function() {
            for(;loop-- > 0;) break;
            return;
        })();
        (function() {
            for(;loop-- > 0;) continue;
            arguments
        })();
        arr.push(function() { return y; });
    })();}
})();
console.log(arr.map(call).join("|") == [0,1,2].join("|"));

// For-In
arr = [];var val;
for (var x$6 in (val = [0,1,2])) (function(x){if(val.hasOwnProperty(x)) {
    arr.push(function() { return x; });
}})(x$6);
console.log(arr.map(call).join("|") == Object.keys(val).join("|"));

// Block-less For-In
arr = [];
for (var x$7 in [0,1,2]) (function(x){arr.push(function() { return x; });})(x$7);/*with semicolon*/
for (var x$8 in [0,1,2]) (function(x){arr.push(function() { return x; })/*no semicolon*/

})(x$8);null; // previous semicolon-less for statement's range ends just before 'n' in 'null'
console.log(arr.map(call).join("|") == [0, 1, 2, 0, 1, 2].join("|"));

// While
arr = [];loop = 2;
while (loop--) {(function(){
    var x = 1;
    arr.push(function() { return x; });
})();}
console.log(arr.map(call).join("|") == [1, 1].join("|"));

// Do-While
arr = [];loop = 2;
do {(function(){
    var x = 1;
    arr.push(function() { return x; });
})();} while (loop--);
console.log(arr.map(call).join("|") == [1, 1, 1].join("|"));

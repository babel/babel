"use strict";

x; // error (unless disallowUnknownReferences=false)
if (true) {
    x; // error
    if (true) {
        x; // error
    }
    if (true) {
        let x;
        x; // ok
    }
    let f = function() {
        return x; // ok
    };
    f(); // ok from a static analysis standpoint but runtime error in ES6

    let x = 3;

    f(); // ok
    x; // ok
    if (true) {
        x; // ok
    }
}

"use strict";

//console.log(g);
try {
    throw 1;
} catch (e) {
    {
        let e = 3;
        console.log(e);
        var g = 0;
    }
    console.log(e);
}
console.log(g);

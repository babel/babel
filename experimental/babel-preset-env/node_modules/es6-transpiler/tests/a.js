"use strict";
function fn() {
    var x = 3;
    if (true) {
        let x = 4;
        console.log(x);
    }
    console.log(x);
}

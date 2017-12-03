"use strict";

var x = 1;
{
    let x = 3;
    try {
    } catch (x) {
        console.log(x);
    }
}

"use strict";

function test1(a = 1) {
    console.log(a === 1);
}
test1();

function test2(a, b = 2) {
    console.log(a === 1, b === 2);
}
test2(1);

function test3(a, b = 2, c = {a: 1}) {
    console.log(a === 1, b === 9, typeof c === "object" && c.a === 1);
}
test3(1, 9);

function test4(a, b = 2) {
    function inner(b = a, c = b) {
        console.log(b === 1, c === 1);
    }
    inner();
}
test4(1);

function test5(a = 1, ...rest) {
    console.log(a === 1, rest.join("|") === "");
}
test5();

"use strict";

function f(n) {
    if (n <= 0) {
        return "foo";
    } else {
        return to5Runtime.tailCall(g, [n - 1]);
    }
}

function g(n) {
    if (n <= 0) {
        return "goo";
    } else {
        return to5Runtime.tailCall(f, [n - 1]);
    }
}

"use strict";

let _this = [];

function dec() {
    _this.push(this);
}

let o1 = { dec };
let o2 = { dec };
let o3 = { o: { dec } };

@o1.dec
@dec
@o2.dec
class A {
    @o2.dec
    @o3.o.dec
    x;

    @o2.dec
    @dec
    y;
}

expect(_this).toEqual([o3.o, o2, undefined, o2, o2, undefined, o1]);

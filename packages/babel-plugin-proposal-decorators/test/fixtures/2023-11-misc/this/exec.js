"use strict";

let _this = [];

function dec() {
    _this.push(this);
}

let o1 = { dec };
let o2 = { dec };
let o3 = { o: { dec } };
let o4oCounter = 0;
let o4 = { o() { o4oCounter++; return o1 } };

@o1.dec
@dec
@o2.dec
@(o4.o().dec)
class A {
    @o2.dec
    @o3.o.dec
    @(o4.o().dec)
    x;

    @o2.dec
    @dec
    y;
}

expect(_this).toEqual([o1, o3.o, o2, undefined, o2, o1, o2, undefined, o1]);
expect(o4oCounter).toBe(2);

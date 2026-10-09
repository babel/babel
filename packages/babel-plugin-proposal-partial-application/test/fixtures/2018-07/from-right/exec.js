"use strict";

function add(x, y) { return x + y; }
const addTen = add(?, 10);

expect(addTen(2)).toEqual(12);
expect(addTen.length).toEqual(1);
expect(addTen.name).toEqual("add");

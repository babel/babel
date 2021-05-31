"use strict";

function add(x, y) { return x + y; }
const addOne = add(1, ?);
const addTen = add(?, 10);

expect(addOne(addTen(1))).toEqual(12);

"use strict";

function add(x, y) { return x + y; }
const addOne = add(1, ?);

expect(addOne(2)).toEqual(3);
expect(addOne.length).toEqual(1);
expect(addOne.name).toEqual("add");

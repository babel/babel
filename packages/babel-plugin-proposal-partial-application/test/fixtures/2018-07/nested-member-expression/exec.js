"use strict";

const obj = {a : {b : {c : {add: (x, y) => x + y}}}};

const addOne = obj.a.b.c.add(1, ?);

expect(addOne(4)).toEqual(5);
expect(addOne.length).toEqual(1);
expect(addOne.name).toEqual("add");

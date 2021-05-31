"use strict";

const slice = Array.prototype.slice.call(?, ?, ?);

expect(slice({ 0: "a", 1: "b", length: 2 }, 1, 2)).toEqual(["b"]);
expect(slice.length).toEqual(3);
expect(slice.name).toEqual("call");

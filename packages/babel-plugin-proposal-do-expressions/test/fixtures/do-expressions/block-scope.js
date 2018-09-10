"use strict";

let a = 1;

(do {
  let a = 2;
  expect(a).toBe(2);
});
expect(a).toBe(1);


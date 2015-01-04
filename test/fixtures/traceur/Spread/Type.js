
assert.throw(() => {
  [0, ...{}, 1];
}, TypeError);

assert.throw(() => {
  [0, ...{0: 1, 1: 2, length: 2}, 3];
}, TypeError);

assert.throw(() => {
  [0, ...true, 1];
}, TypeError);

assert.throw(() => {
  [0, ...1, 1];
}, TypeError);

assert.throw(() => {
  [0, ...function() {}, 1];
}, TypeError);

assert.throw(function() {
  [0, ...null, 1];
}, TypeError);

assert.throw(function() {
  [0, ...undefined, 1];
}, TypeError);


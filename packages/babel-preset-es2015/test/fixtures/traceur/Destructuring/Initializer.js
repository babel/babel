var [a = 0] = [];
assert.equal(0, a);

var {b = 1} = {};
assert.equal(1, b);

var {c = 2} = {c: 3};
assert.equal(3, c);

var {d = 4} = Object.create({d: 5});
assert.equal(5, d);

var {e: f = 6} = {};
assert.equal(6, f);

var {g: h = 7} = {h: 8};
assert.equal(7, h);

var [, , , i = 9] = [10, 11, 12];
assert.equal(9, i);

function j({x = 42}, expected) {
  assert.equal(expected, x);
}

j({}, 42);
j({x: 43}, 43);

var count = 0;
var [k = 42] = (count++, [21]);
assert.equal(21, k);
assert.equal(1, count);

var {x = 1} = {x: undefined};
assert.equal(x, 1);

var {'x': x = 2} = {x: undefined};
assert.equal(x, 2);

var {['x']: x = 3} = {x: undefined};
assert.equal(x, 3);

var [y = 4] = [undefined];
assert.equal(y, 4);


var xCount = 0;
var yCount = 0;
var zCount = 0;

var object = {
  get x() {
    xCount++;
    return {
      get y() {
        yCount++;
        return {
          get z() {
            zCount++;
            return undefined;
          }
        };
      }
    };
  }
};

var {y: {z = 5, w = 6}, v = 7} = object.x;
assert.equal(z, 5);
assert.equal(w, 6);
assert.equal(v, 7);
assert.equal(xCount, 1);
assert.equal(yCount, 1);
assert.equal(zCount, 1);

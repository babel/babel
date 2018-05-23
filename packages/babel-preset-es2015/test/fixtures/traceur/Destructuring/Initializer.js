var [a = 0] = [];
expect(a).toBe(0);

var {b = 1} = {};
expect(b).toBe(1);

var {c = 2} = {c: 3};
expect(c).toBe(3);

var {d = 4} = Object.create({d: 5});
expect(d).toBe(5);

var {e: f = 6} = {};
expect(f).toBe(6);

var {g: h = 7} = {h: 8};
expect(h).toBe(7);

var [, , , i = 9] = [10, 11, 12];
expect(i).toBe(9);

function j({x = 42}, expected) {
  expect(expected).toBe(x);
}

j({}, 42);
j({x: 43}, 43);

var count = 0;
var [k = 42] = (count++, [21]);
expect(k).toBe(21);
expect(count).toBe(1);

var {x = 1} = {x: undefined};
expect(x).toBe(1);

var {'x': x = 2} = {x: undefined};
expect(x).toBe(2);

var {['x']: x = 3} = {x: undefined};
expect(x).toBe(3);

var [y = 4] = [undefined];
expect(y).toBe(4);


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
expect(z).toBe(5);
expect(w).toBe(6);
expect(v).toBe(7);
expect(xCount).toBe(1);
expect(yCount).toBe(1);
expect(zCount).toBe(1);

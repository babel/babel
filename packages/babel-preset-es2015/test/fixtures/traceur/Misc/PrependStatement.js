var count = 0;
var o = {
  get x() {
    count++;
    return 1;
  }
};

function f({x}) {}
f(o);
expect(count).toBe(1);

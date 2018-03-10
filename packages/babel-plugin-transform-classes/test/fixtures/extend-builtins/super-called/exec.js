var called = false;

this.Array = function _Array() {
  called = true;
}

class List extends Array {};
new List();

expect(called).toBe(true);

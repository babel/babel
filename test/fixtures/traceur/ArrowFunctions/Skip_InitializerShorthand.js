// Skip. Not implemented.

// TODO: needs the intializer shorthand implemented for arrow functions

// Object intializer shorthand: "method" = function-valued property with dynamic ''this''
const obj = {
  method() -> {
    return => this;
  }
};

assert(obj.method() === obj);
assert(obj.method.call(u) === u);

// Name binding forms hoist to body (var) or block (let, const) top
var warmer(a) -> { return a; };
let warm(b) -> { return b; };
const colder(c) -> { return c; };
const #coldest(d) -> {...};

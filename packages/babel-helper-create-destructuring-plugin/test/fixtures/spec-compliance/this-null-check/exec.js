// `this` is undefined in strict functions
function f() {
  "use strict";
  const {} = this;
}
function g() {
  "use strict";
  ({} = this);
}
expect(() => f()).toThrow(TypeError);
expect(() => g()).toThrow(TypeError);
expect(() => f.call({})).not.toThrow();

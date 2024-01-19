// Ref: https://github.com/babel/babel/issues/16219

delete global.Symbol

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.to-primitive");

const symbol = Symbol("test");

// Use eval to not let Babel transform this `typeof`
expect(eval('typeof symbol')).toBe("object");
expect(typeof symbol).toBe("symbol");

function objectWithPrimitive(prim) {
  return { [Symbol.toPrimitive]: () => prim }
}

expect(() => {
  class AxiosHeaders {
    [objectWithPrimitive(symbol)]() {
      return;
    }
  }
}).not.toThrow()

expect(() => {
  class AxiosHeaders {
    [objectWithPrimitive({})]() {
      return;
    }
  }
}).toThrow()

return "ok";

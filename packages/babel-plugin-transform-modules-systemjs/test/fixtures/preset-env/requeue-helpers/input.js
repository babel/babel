// Ref: https://github.com/babel/babel/issues/16219

delete global.Symbol

require("core-js/modules/es.symbol.js");

const symbol = Symbol("test");

// Use eval to not let Babel transform this `typeof`
expect(eval('typeof symbol')).toBe("object");
expect(typeof symbol).toBe("symbol");

expect(() => {
  class AxiosHeaders {
    [Symbol.iterator]() {
      return;
    }
  }
}).not.toThrow()

return "ok";

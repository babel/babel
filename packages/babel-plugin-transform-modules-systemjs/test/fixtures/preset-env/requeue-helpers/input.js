// Ref: https://github.com/babel/babel/issues/16219

let nativeSymbol = Symbol;
try {
  delete global.Symbol

  global.Symbol = require("core-js-pure/es/symbol");

  const symbol = Symbol("test");

  expect(eval('typeof symbol === "object"')).toBe(true);
  expect(typeof symbol === "symbol").toBe(true);
  expect(eval("_toPropertyKey(symbol)")).toBe(symbol);
} finally {
  global.Symbol = nativeSymbol;
}

return "done";

class AxiosHeaders {
  [Symbol.iterator]() {
    return;
  }
}

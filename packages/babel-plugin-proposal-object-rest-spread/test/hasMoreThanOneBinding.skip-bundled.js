import { parse } from "@babel/parser";

import _shouldStoreRHSInTemporaryVariable from "../lib/shouldStoreRHSInTemporaryVariable.js";
const shouldStoreRHSInTemporaryVariable =
  _shouldStoreRHSInTemporaryVariable.default ||
  _shouldStoreRHSInTemporaryVariable;

function getFistObjectPattern(program) {
  return parse(program, { sourceType: "module" }).program.body[0]
    .declarations[0].id;
}
describe("shouldStoreRHSInTemporaryVariable", function () {
  it.each([
    ["const { x: { ...y } } = z();", true],
    ["let { x4: { ...y4 } } = z();", true],
    ["let { x5: { w5, ...y5 } } = z();", true],
    ["let { x6: { w6: { a6, ...y6 } } } = z();", true],
    ["let { x7: { e7, r7 }, q7: { w7: { a7, ...y7 } } } = z();", true],
    ["let { x8, ...y8 } = z();", true],
    ["let { x9: { w9: { a9, ...y9 } }, x10: { a10, ...y10 },  } = z();", true],
    ["let { x11: [{ w11, ...z11 }] } = z();", true],
    ["let { x12: [{ a12, b12 }, { c12, ...d12 }] } = z();", true],
    ["let { x13: [, { c13, ...d13 }] } = z();", true],
    ["const { x14: [...{ q14, ...y14 }] } = z();", true],
    ["const { x15: [...{ ...y16 }] } = z();", true],
    ["const [...[ ...y17 ]] = z();", true],
    ["const [...{ ...y18 }] = z();", true],
    ["const [...{ a19, ...y19 }] = z();", true],
    ["const { x20: { ...y20 } = { } } = z();", true],
    ["const { x22: { q22, ...y22  } = {} } = z();", true],
    ["const [[ ...y23 ] = []] = z();", true],
    ["const [{ ...y24 } = []] = z();", true],
    ["const { x25: [ ...y25 ] = []} = z();", true],
    ["const { x26: [ q26, ...y26 ] = []} = z();", true],
    ["const {x28: [,,{...y28}]} = z();", true],
    ["const {x29: [,,{q29, ...y29}]} = z();", true],
    ["const [,,{y30, ...x30}] = z();", true],
    ["const [,,{...x31}] = z();", true],
    ["const { x32: { }, w32: { ...y32 } } = z();", true],
    ["const [,,{}, {...q32}] = z();", true],
    ["const { ...y33 } = z();", true],
    ["const { x16: [] } = z();", false],
    ["const {} = {};", false],
    ["const [,,x27] = z();", false],
  ])("%s", (code, expectedResult) => {
    const ast = getFistObjectPattern(code);
    const result = shouldStoreRHSInTemporaryVariable(ast);
    expect(result).toEqual(expectedResult);
  });
});

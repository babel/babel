export * from "OK";
export { name } from "OK";
export { a as b, c as d } from "hello";
export { a as b, c as d };
export {};
export default i = 20;
export function test() {}
export class test2 {}
export var i = 20;
export let i = 42;

export default (function () {})();
export default (class {})();
export default {};

export default function test3() {}
export default class test4 {}

export default function () {}
export default class {}

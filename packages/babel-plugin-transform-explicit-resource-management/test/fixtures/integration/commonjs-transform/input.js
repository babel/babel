import { doSomething } from "somewhere";
export * from "somewhere else";
export * as ns from "somewhere else";

function f() { a; B; }
function h() { b; A; }
export function g() { c; }

doSomething();

export { f };
export let { b } = {};

let c = 2;
class A {}
export class B {}

using x = null;

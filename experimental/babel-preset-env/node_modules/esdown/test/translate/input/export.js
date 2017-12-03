export function A() {}
export var X, Y;
export var { J, K } = obj;

function B() {}
export { B };

function C() {}
export { C };
export { C as D };
export { C as default };

export * from "z";

export default function F() {}
export default class G {}
export default function() {}
export default class {}
export default 1 + 1;

export m from "z";
export * as all from "z";

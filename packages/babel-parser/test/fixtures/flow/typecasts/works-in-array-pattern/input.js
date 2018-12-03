([a: string]) => {};
([a, [b: string]]) => {};
([a: string] = []) => {};
({ x: [a: string] }) => {};

async ([a: string]) => {};
async ([a, [b: string]]) => {};
async ([a: string] = []) => {};
async ({ x: [a: string] }) => {};

let [a: string] = c;
let [a, [b: string]] = c;
let [a: string] = c;
let { x: [a: string] } = c;

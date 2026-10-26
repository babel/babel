const proto = { x: 7 };
const obj = { ...{}, __proto__: proto, m() { return super.x; } };
obj.m();

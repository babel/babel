function a({ ...a34 }) {}
function a2({a1, ...b1}) {}
function a3({a2, b2, ...c2}) {}
function a4({a3, ...c3}, {a5, ...c5}) {}
function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {}
function a6({a3, b2: { ba1, ...ba2 } }) {}
function a7({a1 = 1, ...b1} = {}) {}
function a8([{...a1}]) {}
function a9([{a1, ...a2}]) {}
function a10([a1, {...a2}]) {}
function a11({...a}, b = a) {}
function a12({...a}, b = a, {...c}) {}
function a13({...a}, b = a, {...c}, { d } = c) {}
function a14({...a}, { b = a }) {}
// Unchanged
function b(a) {}
function b2(a, ...b) {}
function b3({ b }) {}

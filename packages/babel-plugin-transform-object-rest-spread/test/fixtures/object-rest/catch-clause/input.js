try {} catch({ ...a34 }) {}
try {} catch({a1, ...b1}) {}
try {} catch({a2, b2, ...c2}) {}
try {} catch({a2, b2, c2: { c3, ...c4 }}) {}

// Unchanged
try {} catch(a) {}
try {} catch({ b }) {}

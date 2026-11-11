try {} catch({ ...a34 }) {}
try {} catch({a1, ...b1}) {}
try {} catch({a2, b2, ...c2}) {}
try {} catch({a2, b2, c2: { c3, ...c4 }}) {}
try {} catch([...{ 0: a5, ...b5 }]) {}

// Unchanged
try {} catch(a) {}
try {} catch({ b }) {}

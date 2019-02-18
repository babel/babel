let e1 = v1 as const;  // Error
let e2 = (true ? 1 : 0) as const;  // Error
let e3 = id(1) as const;  // Error
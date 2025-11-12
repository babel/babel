let a = { get x() { a = { z: 2 } }, y: 2 };

let x, rest;
({ x, ...rest } = a);

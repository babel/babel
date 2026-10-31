const b = 1, k = "x";
try {
  throw { x: 2 };
} catch ({ a = b, [k]: c, ...rest }) {
  let b = 3;
  const k = "y";
}

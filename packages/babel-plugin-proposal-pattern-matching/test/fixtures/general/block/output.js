let _case = input,
    _x,
    _y,
    _z;

if (Object.is(_case) && (_x = _case.x, typeof _x !== "undefined")) {
  console.log('object: ', _x);
} else if (Object.is(_case) && (_y = _case.y, typeof _y !== "undefined")) {
  const _y = 3;
  console.log('object: ', _y);
} else if (Object.is(_case) && (_z = _case.z, typeof _z !== "undefined")) {
  consle.log(_z);

  if (window) {
    const _z = "window";
    console.log(_z);
  }
}

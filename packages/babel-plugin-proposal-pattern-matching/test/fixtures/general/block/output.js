let _case = input,
    _x,
    _y,
    _z;

if (_case !== undefined && _case !== null && (_x = _case.x, typeof _x !== "undefined")) {
  console.log('object: ', _x);
} else if (_case !== undefined && _case !== null && (_y = _case.y, typeof _y !== "undefined")) {
  const _y = 3;
  console.log('object: ', _y);
} else if (_case !== undefined && _case !== null && (_z = _case.z, typeof _z !== "undefined")) {
  consle.log(_z);

  if (window) {
    const _z = "window";
    console.log(_z);
  }
}

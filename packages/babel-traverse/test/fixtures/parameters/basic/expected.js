let functionExpression = function (_ref) {
  let [{ x }] = [_ref];

  return x;
};

function functionDeclaration(_ref2) {
  let [{ x }] = [_ref2];

  return x;
}

class Classy {
  method(_ref3) {
    let [{ x }] = [_ref3];

    return x;
  }
}

let arrowFunctionExpression = (_ref4) => {
  let [{ x }] = [_ref4];
  return x;
};
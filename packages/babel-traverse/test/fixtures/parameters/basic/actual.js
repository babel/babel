let functionExpression = function ({x}) {
  return x;
}

function functionDeclaration({x}) {
  return x;
}

class Classy {
  method({x}) {
    return x;
  }
}

let arrowFunctionExpression = ({x}) => x;

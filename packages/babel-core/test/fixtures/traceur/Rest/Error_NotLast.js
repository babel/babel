// Error: :3:46: Unexpected token ,

function invalidParam(noDefault, ...restParam, noRestAgain) {
  // Should fail to parse since non rest param is not allowed after
  // param.
}
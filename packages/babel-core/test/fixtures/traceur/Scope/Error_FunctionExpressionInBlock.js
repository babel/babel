// Options: --block-binding
// Error: functionExpression is not defined

{
  (function functionExpression() {
    return 'inner';
  });

  functionExpression;  // function expression doesn't add name to the scope.
}

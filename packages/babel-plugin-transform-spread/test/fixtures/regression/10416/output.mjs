const E_ARR = [];
export default function () {
  const someVar = E_ARR;
  return babelHelpers.toConsumableArray(someVar);
}

let useState = [{
  some: 42
}, () => null];
let _useState$ = useState[0],
  {
    numeric
  } = _useState$,
  rest1 = babelHelpers.objectWithoutProperties(_useState$, ["numeric"]),
  _useState$2 = useState['2'],
  {
    str
  } = _useState$2,
  rest2 = babelHelpers.objectWithoutProperties(_useState$2, ["str"]),
  {
    1: setState
  } = useState;

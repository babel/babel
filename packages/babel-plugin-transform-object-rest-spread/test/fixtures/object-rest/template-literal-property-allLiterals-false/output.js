var _ref, _ref2;
const input = {};
const {
    given_name: givenName,
    'last_name': lastName,
    [`country`]: country,
    [_ref = prefix + 'state']: state,
    [_ref2 = `${prefix}consents`]: consents
  } = input,
  rest = babelHelpers.objectWithoutProperties(input, ["given_name", "last_name", `country`, _ref, _ref2].map(babelHelpers.toPropertyKey));

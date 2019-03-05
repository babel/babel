const input = {};

const _ref = prefix + 'state',
      _ref2 = `${prefix}consents`,
      {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  [_ref]: state,
  [_ref2]: consents
} = input,
      rest = babelHelpers.objectWithoutProperties(input, ["given_name", "last_name", `country`, _ref, _ref2].map(babelHelpers.toPropertyKey));

const secondInput = {};
const _ref3 = `${prefix}last`,
      {
  name: name,
  'first_name': first,
  [`middle`]: middle,
  [_ref3]: last
} = secondInput,
      another = babelHelpers.objectWithoutProperties(secondInput, ["name", "first_name", `middle`, _ref3].map(babelHelpers.toPropertyKey));

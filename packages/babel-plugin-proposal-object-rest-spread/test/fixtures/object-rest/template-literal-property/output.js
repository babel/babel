const input = {};
const _ref = `${prefix}consents`,
      {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  [_ref]: consents
} = input,
      rest = babelHelpers.objectWithoutProperties(input, ["given_name", "last_name", `country`, _ref].map(babelHelpers.toPropertyKey));

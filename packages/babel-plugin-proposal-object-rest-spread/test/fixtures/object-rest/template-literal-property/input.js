const input = {};

const {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  [prefix + 'state']: state,
  [`${prefix}consents`]: consents,
  ...rest
} = input;

const secondInput = {};

const {
  name: name,
  'first_name': first,
  [`middle`]: middle,
  [`${prefix}last`]: last,
  ...another
} = secondInput;

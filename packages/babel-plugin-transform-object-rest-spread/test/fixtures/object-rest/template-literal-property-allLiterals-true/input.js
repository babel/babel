const input = {};

const {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  ...rest
} = input;

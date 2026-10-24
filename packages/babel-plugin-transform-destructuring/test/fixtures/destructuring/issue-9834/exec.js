var prefix = "user_";

const input = {};

const {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  [prefix + 'state']: state,
  [`${prefix}consents`]: consents,
  ...rest
} = input;

expect([givenName, lastName, country, state, consents]).toEqual([
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
]);
expect(rest).toEqual({});

{
  const input = {
    given_name: "Jane",
    last_name: "Doe",
    country: "NL",
    user_state: "NH",
    user_consents: true,
    extra: 1,
  };

  const {
    given_name: givenName,
    'last_name': lastName,
    [`country`]: country,
    [prefix + 'state']: state,
    [`${prefix}consents`]: consents,
    ...rest
  } = input;

  expect([givenName, lastName, country, state, consents]).toEqual([
    "Jane",
    "Doe",
    "NL",
    "NH",
    true,
  ]);
  expect(rest).toEqual({ extra: 1 });
}

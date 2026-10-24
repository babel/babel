var prefix = "home_";

const input = {};

const {
  given_name: givenName,
  'last_name': lastName,
  [`country`]: country,
  [prefix + 'state']: state,
  [`${prefix}consents`]: consents,
  ...rest
} = input;

expect(givenName).toBeUndefined();
expect(lastName).toBeUndefined();
expect(country).toBeUndefined();
expect(state).toBeUndefined();
expect(consents).toBeUndefined();
expect(rest).toEqual({});
expect(rest).not.toBe(input);

// The same pattern, with an input that has all the properties.
{
  const input = {
    given_name: "Jane",
    last_name: "Doe",
    country: "CA",
    home_state: "ON",
    home_consents: true,
    zip: "M5V",
  };

  const {
    given_name: givenName,
    'last_name': lastName,
    [`country`]: country,
    [prefix + 'state']: state,
    [`${prefix}consents`]: consents,
    ...rest
  } = input;

  expect(givenName).toBe("Jane");
  expect(lastName).toBe("Doe");
  expect(country).toBe("CA");
  expect(state).toBe("ON");
  expect(consents).toBe(true);
  expect(rest).toEqual({ zip: "M5V" });
}

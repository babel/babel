const expectedValue = 42;

function decorator () {}

const result = expectedValue
  |> @decorator class { constructor () { this.value = @@; } };

expect((new result).value).toBe(expectedValue);

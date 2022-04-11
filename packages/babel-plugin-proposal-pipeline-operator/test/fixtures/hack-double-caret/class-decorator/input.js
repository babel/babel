const expectedValue = 42;

function decorator (target) {
  target.decoratorValue = expectedValue;
}

const result = expectedValue
  |> @decorator class { constructor () { this.value = ^^; } };

expect(result.decoratorValue).toBe(expectedValue);
expect((new result).value).toBe(expectedValue);

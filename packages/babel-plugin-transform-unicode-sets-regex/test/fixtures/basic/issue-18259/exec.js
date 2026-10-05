const regex = /[[b-da-c]&&a]/v;

expect(regex.test("a")).toBe(true);
expect(regex.test("b")).toBe(false);

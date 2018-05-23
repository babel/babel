var fields = [{ name: "title" }, { name: "content" }];

for (let { name, value = "Default value" } of fields) {
  expect(value).toBe("Default value");
}

var fields = [{ name: "title" }, { name: "content" }];

for (let { name, value = "Default value" } of fields) {
  assert.equal(value, "Default value");
}

import runner from "@babel/helper-plugin-test-runner";

runner(import.meta.url);

it("dummy", () => {
  expect(1).toBe(1);
});

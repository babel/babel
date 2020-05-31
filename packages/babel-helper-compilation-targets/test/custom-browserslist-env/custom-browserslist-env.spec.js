import getTargets from "../..";

it("allows custom browserslist env", () => {
  const actual = getTargets(
    {},
    { configPath: __dirname, browserslistEnv: "custom" },
  );

  expect(actual).toEqual({ ie: "11.0.0" });
});

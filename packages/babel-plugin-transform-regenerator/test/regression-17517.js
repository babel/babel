import { transformSync } from "@babel/core";

describe("regression", () => {
  it("does not crash on destructuring inside async functions (#17517)", () => {
    const code = `
      const testA = async () => {
        return async () => {
          const { resData, config } = {}
          console.log('a', resData)
        }
      }

      const testB = async () => {
        await testA()
      }

      console.log(testB)
    `;

    expect(() =>
      transformSync(code, {
        filename: "input.js",
        configFile: false,
        babelrc: false,
        sourceType: "module",
        plugins: [
          require.resolve("@babel/plugin-transform-async-to-generator"),
          require.resolve("../lib/index.js"),
        ],
      }),
    ).not.toThrow();
  });
});


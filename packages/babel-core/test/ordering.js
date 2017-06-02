import * as babel from "../lib/index";
import assert from "assert";

const decoratorsPlugin = require.resolve("../../babel-plugin-transform-class-properties");
const classPropertiesPlugin = require.resolve("../../babel-plugin-transform-decorators");
const functionBindPlugin = require.resolve("../../babel-plugin-transform-function-bind");

describe("plugin ordering", function () {
  it("reorders for class properties and decorators", function() {
    const code = `
      function myDecorator() {}

      class Person{
        @myDecorator
        age = 43;

        constructor() {
          console.log(this.age);
        }
      }
    `;

    const res1 = babel.transform(code, {
      plugins: [
        decoratorsPlugin,
        classPropertiesPlugin,
      ],
    });

    const res2 = babel.transform(code, {
      plugins: [
        classPropertiesPlugin,
        decoratorsPlugin,
      ],
    });

    assert.equal(res1.code, res2.code);
  });
});

describe("plugin ordering with unordered plugin", function () {
  it("reorders correctly with an unordered plugin", function() {
    const code = `
      function myDecorator() {}

      class Person{
        @myDecorator
        age = 43;

        constructor() {
          Promise.resolve(this.age).then(::console.log);
        }
      }
    `;

    const res1 = babel.transform(code, {
      plugins: [
        decoratorsPlugin,
        classPropertiesPlugin,
        functionBindPlugin,
      ],
    });

    const res2 = babel.transform(code, {
      plugins: [
        functionBindPlugin,
        classPropertiesPlugin,
        decoratorsPlugin,
      ],
    });

    assert.equal(res1.code, res2.code);
  });
});

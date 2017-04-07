const assert = require("assert");
const babel = require("babel-core");

test("Doesn't throw with arrow function inside generator", function () {
  const code = "function* gen () {const a = () => {return 1;}}";

  const transform = function () {
    babel.transform(code, {
      "plugins": [
        require("../"),
      ],
    });
  };

  assert.doesNotThrow(
    transform,
    Error
  );
});

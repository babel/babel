import { expect } from "chai";
import getFixtures from "../lib";
import path from "path";

describe("babel helper fixtures", () => {

  it("loads fixtures", () => {
    const fixtures = getFixtures(__dirname + "/fixtures");
    expect(fixtures).to.deep.equal([
      {
        "filename": path.join(__dirname, "fixtures/arrow-functions"),
        "options": {},
        "tests": [
          {
            "actual": {
              "code": "() => {}()",
              "filename": "arrow-functions/no-callee/actual.js",
              "loc": path.join(__dirname, "fixtures/arrow-functions/no-callee/actual.js"),
            },
            "disabled": false,
            "exec": {
              "code": "",
              "filename": "arrow-functions/no-callee/exec.js",
              "loc": path.join(__dirname, "fixtures/arrow-functions/no-callee/exec.js"),
            },
            "expect": {
              "code": "",
              "filename": "arrow-functions/no-callee/expected.js",
              "loc": path.join(__dirname, "fixtures/arrow-functions/no-callee/expected.js"),
            },
            "options": {
              "throws": "Unexpected token, expected ; (1:8)",
            },
            "optionsDir": path.join(__dirname, "fixtures/arrow-functions/no-callee"),
            "title": "no callee",
          },
        ],
        "title": "arrow functions",
      },
      {
        "filename": path.join(__dirname, "fixtures/destructuring"),
        "options": {},
        "tests": [
          {
            "actual": {
              "code": "var { this };",
              "filename": "destructuring/binding-this/actual.js",
              "loc": path.join(__dirname, "fixtures/destructuring/binding-this/actual.js"),
            },
            "disabled": false,
            "exec": {
              "code": "",
              "filename": "destructuring/binding-this/exec.js",
              "loc": path.join(__dirname, "fixtures/destructuring/binding-this/exec.js"),
            },
            "expect": {
              "code": "",
              "filename": "destructuring/binding-this/expected.js",
              "loc": path.join(__dirname, "fixtures/destructuring/binding-this/expected.js"),
            },
            "options": {
              "throws": "this is a reserved word (1:6)",
            },
            "optionsDir": path.join(__dirname, "fixtures/destructuring/binding-this"),
            "title": "binding this",
          },
          {
            "actual": {
              "code": "([a += a] = a)",
              "filename": "destructuring/error-operator-for-default/actual.js",
              "loc": path.join(__dirname, "fixtures/destructuring/error-operator-for-default/actual.js"),
            },
            "disabled": false,
            "exec": {
              "code": "",
              "filename": "destructuring/error-operator-for-default/exec.js",
              "loc": path.join(__dirname, "fixtures/destructuring/error-operator-for-default/exec.js"),
            },
            "expect": {
              "code": "",
              "filename": "destructuring/error-operator-for-default/expected.js",
              "loc": path.join(__dirname, "fixtures/destructuring/error-operator-for-default/expected.js"),
            },
            "options": {
              "throws": "Only '=' operator can be used for specifying default value. (1:3)",
            },
            "optionsDir": path.join(__dirname, "fixtures/destructuring/error-operator-for-default"),
            "title": "error operator for default",
          },
        ],
        "title": "destructuring",
      },
      {
        "filename": path.join(__dirname, "fixtures/raw"),
        "options": {},
        "tests": [
          {
            "actual": {
              "code": ".btn { color: red; }",
              "filename": "raw/css/actual.css",
              "loc": path.join(__dirname, "fixtures/raw/css/actual.css"),
            },
            "disabled": false,
            "exec": {
              "code": "",
              "filename": "raw/css/exec.js",
              "loc": path.join(__dirname, "fixtures/raw/css/exec.js"),
            },
            "expect": {
              "code": "export default const styles = \".btn { color: red; }\";",
              "filename": "raw/css/expected.js",
              "loc": path.join(__dirname, "fixtures/raw/css/expected.js"),
            },
            "options": {},
            "optionsDir": null,
            "title": "css",
          },
          {
            "actual": {
              "code": "{\n  \"foo\": \"bar\"\n}",
              "filename": "raw/json/actual.json",
              "loc": path.join(__dirname, "fixtures/raw/json/actual.json"),
            },
            "disabled": false,
            "exec": {
              "code": "",
              "filename": "raw/json/exec.js",
              "loc": path.join(__dirname, "fixtures/raw/json/exec.js"),
            },
            "expect": {
              "code": "export default const json = {\n  foo: \"bar\"\n}",
              "filename": "raw/json/expected.js",
              "loc": path.join(__dirname, "fixtures/raw/json/expected.js"),
            },
            "options": {},
            "optionsDir": null,
            "title": "json",
          },
        ],
        "title": "raw",
      },
    ]);
  });
});

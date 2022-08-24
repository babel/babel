import * as babel from "../lib/index.js";

const replaceAll = "".replaceAll
  ? Function.call.bind("".replaceAll)
  : (str, find, replace) => str.split(find).join(replace);

function expectError(run) {
  try {
    run();
  } catch (e) {
    let { stack } = e;
    stack = replaceAll(stack, import.meta.url, "<URL PLACEHOLDER>").replace(
      /(?:\n\s*at[^\n]+?<URL PLACEHOLDER>[^\n]+)+/g,
      "\n    ... frames from this test file ...",
    );
    // Remove jest-related stack frames
    stack = stack.replace(
      /(?:\n\s*at[^\n]+?node_modules\/(?:jest|piscina)[^\n]+)+/g,
      "\n    ... internal jest frames ...",
    );
    stack = replaceAll(stack, process.cwd(), "<CWD>");
    // Replace line/column numbers, since they are affected by how
    // the code is compiled.
    stack = stack.replace(/:\d+:\d+\)$/gm, ":_:_)");
    return expect(stack);
  }
  throw new Error("It should have thrown an error.");
}

const fixture = name =>
  new URL(`./fixtures/errors/${name}`, import.meta.url).pathname;

describe("@babel/core errors", function () {
  it("error inside config function", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("error-config-function"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Error inside config!
          at myConfig (<CWD>/packages/babel-core/test/fixtures/errors/error-config-function/babel.config.js:_:_)
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("error inside config function with more frames", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("error-config-function-more-frames"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Error inside config!
          at f (<CWD>/packages/babel-core/test/fixtures/errors/error-config-function-more-frames/babel.config.js:_:_)
          at g (<CWD>/packages/babel-core/test/fixtures/errors/error-config-function-more-frames/babel.config.js:_:_)
          at myConfig (<CWD>/packages/babel-core/test/fixtures/errors/error-config-function-more-frames/babel.config.js:_:_)
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("error inside config file", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("error-config-file"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Error inside config!
          at Object.<anonymous> (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file/babel.config.js:_:_)
          at Module._compile (node:internal/modules/cjs/loader:_:_)
          at Module._extensions..js (node:internal/modules/cjs/loader:_:_)
          at Module.load (node:internal/modules/cjs/loader:_:_)
          at Module._load (node:internal/modules/cjs/loader:_:_)
          at Module.require (node:internal/modules/cjs/loader:_:_)
          at require (node:internal/modules/cjs/helpers:_:_)
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ..."
    `);
  });

  it("error inside config file with more frames", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("error-config-file-more-frames"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Error inside config!
          at f (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
          at g (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
          at Object.<anonymous> (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
          at Module._compile (node:internal/modules/cjs/loader:_:_)
          at Module._extensions..js (node:internal/modules/cjs/loader:_:_)
          at Module.load (node:internal/modules/cjs/loader:_:_)
          at Module._load (node:internal/modules/cjs/loader:_:_)
          at Module.require (node:internal/modules/cjs/loader:_:_)
          at require (node:internal/modules/cjs/helpers:_:_)
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)"
    `);
  });

  it("error inside config file with more frames and increased Error.stackTraceLimit", function () {
    const INC = 10;
    Error.stackTraceLimit += INC;
    try {
      expectError(() => {
        babel.parseSync("foo;", {
          root: fixture("error-config-file-more-frames"),
        });
      }).toMatchInlineSnapshot(`
        "Error: Error inside config!
            at f (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
            at g (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
            at Object.<anonymous> (<CWD>/packages/babel-core/test/fixtures/errors/error-config-file-more-frames/babel.config.js:_:_)
            at Module._compile (node:internal/modules/cjs/loader:_:_)
            at Module._extensions..js (node:internal/modules/cjs/loader:_:_)
            at Module.load (node:internal/modules/cjs/loader:_:_)
            at Module._load (node:internal/modules/cjs/loader:_:_)
            at Module.require (node:internal/modules/cjs/loader:_:_)
            at require (node:internal/modules/cjs/helpers:_:_)
            at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
            ... frames from this test file ...
            ... internal jest frames ..."
      `);
    } finally {
      Error.stackTraceLimit -= INC;
    }
  });

  it("invalid JSON config file", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("invalid-json"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Error while parsing config - JSON5: invalid character '}' at 3:1
          at <CWD>/packages/babel-core/test/fixtures/errors/invalid-json/babel.config.json
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("use 'exclude' without filename", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("use-exclude"),
      });
    }).toMatchInlineSnapshot(`
      "Error: Configuration contains string/RegExp pattern, but no filename was passed to Babel
          at <CWD>/packages/babel-core/test/fixtures/errors/use-exclude/babel.config.js
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("use 'exclude' without filename in programmatic options", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        configFile: false,
        exclude: /node_modules/,
      });
    }).toMatchInlineSnapshot(`
      "Error: Configuration contains string/RegExp pattern, but no filename was passed to Babel
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("use 'exclude' without filename in preset", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("use-exclude-in-preset"),
      });
    }).toMatchInlineSnapshot(`
      "Error: [BABEL] unknown: Preset /* your preset */ requires a filename to be set when babel is called directly,
      \`\`\`
      babel.transformSync(code, { filename: 'file.ts', presets: [/* your preset */] });
      \`\`\`
      See https://babeljs.io/docs/en/options#filename for more information.
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("invalid option", function () {
    expectError(() => {
      babel.parseSync("foo;", {
        root: fixture("invalid-option"),
      });
    }).toMatchInlineSnapshot(`
      "Error: .sourceType must be \\"module\\", \\"script\\", \\"unambiguous\\", or undefined
          at <CWD>/packages/babel-core/test/fixtures/errors/invalid-option/babel.config.json
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("invalid option in programmatic options", function () {
    expectError(() =>
      babel.parseSync("foo;", {
        root: fixture("valid"),
        sourceType: "foo",
      }),
    ).toMatchInlineSnapshot(`
      "Error: .sourceType must be \\"module\\", \\"script\\", \\"unambiguous\\", or undefined
          at Module.parseSync (<CWD>/packages/babel-core/lib/parse.js:_:_)
          ... frames from this test file ...
          ... internal jest frames ..."
    `);
  });

  it("internal errors have the full stack trace", function () {
    expectError(() => {
      const { map } = Array.prototype;
      try {
        Array.prototype.map = () => {
          throw new Error("Internal error! This is a fake bug :)");
        };
        babel.parseSync("foo;", {
          root: fixture("valid"),
        });
      } finally {
        Array.prototype.map = map;
      }
    }).toMatchInlineSnapshot(`
      "Error: Internal error! This is a fake bug :)
          ... frames from this test file ...
          at loadOneConfig (<CWD>/packages/babel-core/lib/config/files/configuration.js:_:_)
          at loadOneConfig.next (<anonymous>)
          at buildRootChain (<CWD>/packages/babel-core/lib/config/config-chain.js:_:_)
          at buildRootChain.next (<anonymous>)
          at loadPrivatePartialConfig (<CWD>/packages/babel-core/lib/config/partial.js:_:_)
          at loadPrivatePartialConfig.next (<anonymous>)
          at loadFullConfig (<CWD>/packages/babel-core/lib/config/full.js:_:_)
          at loadFullConfig.next (<anonymous>)
          at parse (<CWD>/packages/babel-core/lib/parse.js:_:_)"
    `);
  });
});

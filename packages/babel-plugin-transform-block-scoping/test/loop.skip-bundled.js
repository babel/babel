import { moveCapturingTestAndUpdateIntoBody } from "../lib/loop.js";

import { parseSync, traverse } from "@babel/core";

function transformFirstForStatement(input) {
  let forPath;
  traverse(parseSync(input, { filename: "example.js", configFile: false }), {
    ForStatement(path) {
      forPath = path;
      path.stop();
    },
  });
  moveCapturingTestAndUpdateIntoBody(forPath);
  return forPath.toString();
}

describe("moveCapturingTestAndUpdateIntoBody", () => {
  it("moves the test when it captures the binding", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; fs.push(() => i), i < 2; i++) body(i);`,
      ),
    ).toMatchInlineSnapshot(`
      "for (let i = 0;; i++) {
        if (!(fs.push(() => i), i < 2)) break;
        body(i);
      }"
    `);
  });

  it("moves the update and the test when the update captures the binding", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; i < 2; fs.push(() => i), i++) body(i);`,
      ),
    ).toMatchInlineSnapshot(`
      "for (let i = 0, _first = true;; _first = false) {
        if (!_first) fs.push(() => i), i++;
        if (!(i < 2)) break;
        body(i);
      }"
    `);
  });

  it("moves both when both capture the binding", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 1; fs.push(() => i), i < 2; i++, fs.push(() => i)) console.log(i);`,
      ),
    ).toMatchInlineSnapshot(`
      "for (let i = 1, _first = true;; _first = false) {
        if (!_first) i++, fs.push(() => i);
        if (!(fs.push(() => i), i < 2)) break;
        console.log(i);
      }"
    `);
  });

  it("moves the update when there is no test", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; ; fs.push(() => i), i++) body(i);`,
      ),
    ).toMatchInlineSnapshot(`
      "for (let i = 0, _first = true;; _first = false) {
        if (!_first) fs.push(() => i), i++;
        body(i);
      }"
    `);
  });

  it("keeps a block body as a nested block", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; fs.push(() => i), i < n; i++) { let n = 1; }`,
      ),
    ).toMatchInlineSnapshot(`
      "for (let i = 0;; i++) {
        if (!(fs.push(() => i), i < n)) break;
        {
          let n = 1;
        }
      }"
    `);
  });

  it("does not change loops without closures in the test or update", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; i < 2; i++) fs.push(() => i);`,
      ),
    ).toMatchInlineSnapshot(`"for (let i = 0; i < 2; i++) fs.push(() => i);"`);
  });

  it("does not change loops whose closures don't capture a loop binding", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; fs.push(() => x), i < 2; fs.push(() => x), i++);`,
      ),
    ).toMatchInlineSnapshot(
      `"for (let i = 0; fs.push(() => x), i < 2; fs.push(() => x), i++);"`,
    );
  });

  it("does not change loops whose captured binding is never reassigned", () => {
    expect(
      transformFirstForStatement(
        `for (let i = 0; fs.push(() => i), n--; fs.push(() => i));`,
      ),
    ).toMatchInlineSnapshot(
      `"for (let i = 0; fs.push(() => i), n--; fs.push(() => i));"`,
    );
  });

  it("does not change const loops", () => {
    expect(
      transformFirstForStatement(
        `for (const i = 0; fs.push(() => i), n--; fs.push(() => i));`,
      ),
    ).toMatchInlineSnapshot(
      `"for (const i = 0; fs.push(() => i), n--; fs.push(() => i));"`,
    );
  });

  it("does not change var loops", () => {
    expect(
      transformFirstForStatement(
        `for (var i = 0; fs.push(() => i), i < 2; fs.push(() => i), i++);`,
      ),
    ).toMatchInlineSnapshot(
      `"for (var i = 0; fs.push(() => i), i < 2; fs.push(() => i), i++);"`,
    );
  });
});

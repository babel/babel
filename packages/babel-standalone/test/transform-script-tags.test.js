import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

describe("transformScriptTags", () => {
  let standaloneSource;
  let JSDOM;
  beforeAll(async () => {
    standaloneSource = fs.readFileSync(
      new URL("../babel.js", import.meta.url),
      "utf8",
    );
    JSDOM = require("jsdom").JSDOM;
  });
  it("should transform script element with type 'text/babel'", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><head><script>${standaloneSource}</script><script type="text/babel">globalThis ?? window</script></head>`,
      { runScripts: "dangerously" },
    );
    return new Promise((resolve, reject) => {
      dom.window.addEventListener("DOMContentLoaded", () => {
        try {
          const transformedScriptElement =
            dom.window.document.head.children.item(2);
          expect(transformedScriptElement.getAttribute("type")).toBeNull();
          expect(transformedScriptElement.innerHTML).toContain(
            "globalThis !== null && globalThis !== void 0 ? globalThis : window",
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
  it("should pass through the nonce attribute to the transformed script element", () => {
    const nonceAttribute = "nonce_example";

    const dom = new JSDOM(
      `<!DOCTYPE html><head><script>${standaloneSource}</script><script type="text/babel" nonce="${nonceAttribute}">globalThis ?? window</script></head>`,
      { runScripts: "dangerously" },
    );
    return new Promise((resolve, reject) => {
      dom.window.addEventListener("DOMContentLoaded", () => {
        try {
          const transformedScriptElement =
            dom.window.document.head.children.item(2);
          expect(transformedScriptElement.nonce).toBe(nonceAttribute);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
  it("should support data-targets attribute", () => {
    const input = `globalThis ?? window; /\\p{ASCII}/v`;
    const targets = "chrome 84"; // Chrome 84 supports nullish coalescing but not the `v` flag in regexps.
    const dom = new JSDOM(
      `<!DOCTYPE html><head><script>${standaloneSource}</script><script type="text/babel" data-targets="${targets}">${input}</script></head>`,
      { runScripts: "dangerously" },
    );
    return new Promise((resolve, reject) => {
      dom.window.addEventListener("DOMContentLoaded", () => {
        try {
          const transformedScriptElement =
            dom.window.document.head.children.item(2);
          expect(
            transformedScriptElement.getAttribute("data-targets"),
          ).toBeNull();
          expect(transformedScriptElement.innerHTML).toContain(
            `globalThis ?? window;
/\\p{ASCII}/u;`,
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
});

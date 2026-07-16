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
  it("should support data-targets attribute with data-type: module", () => {
    const input = `globalThis ?? window; /\\p{ASCII}/v`;
    const targets = "chrome 84"; // Chrome 84 supports nullish coalescing but not the `v` flag in regexps.
    const dom = new JSDOM(
      `<!DOCTYPE html><head><script>${standaloneSource}</script><script type="text/babel" data-targets="${targets}" data-type="module">${input}</script></head>`,
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
  it("should use `runtime: 'classic'` for react", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><head><script>${standaloneSource}</script><script type="text/babel">try{const domNode = document.getElementById('app');const root = ReactDOM.createRoot(domNode);root.render(<h1>Develop. Preview. Ship.</h1>)}catch{}</script></head>`,
      { runScripts: "dangerously" },
    );
    return new Promise((resolve, reject) => {
      dom.window.addEventListener("DOMContentLoaded", () => {
        try {
          const transformedScriptElement =
            dom.window.document.head.children.item(2);
          expect(transformedScriptElement.getAttribute("type")).toBeNull();
          expect(transformedScriptElement.innerHTML).toMatchInlineSnapshot(`
            "try {
              var domNode = document.getElementById('app');
              var root = ReactDOM.createRoot(domNode);
              root.render(/*#__PURE__*/React.createElement("h1", null, "Develop. Preview. Ship."));
            } catch (_unused) {}
            //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiSW5saW5lIEJhYmVsIHNjcmlwdCJdLCJzb3VyY2VzQ29udGVudCI6WyJ0cnl7Y29uc3QgZG9tTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtjb25zdCByb290ID0gUmVhY3RET00uY3JlYXRlUm9vdChkb21Ob2RlKTtyb290LnJlbmRlcig8aDE+RGV2ZWxvcC4gUHJldmlldy4gU2hpcC48L2gxPil9Y2F0Y2h7fSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBRztFQUFDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO0VBQUMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7RUFBQyxJQUFJLENBQUMsTUFBTSxjQUFDLGdDQUFJLHlCQUEyQixDQUFDLENBQUM7QUFBQSxDQUFDLGlCQUFLLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0="
          `);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
});

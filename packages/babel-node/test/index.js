import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const binLoc = path.join(dirname, "../bin/babel-node.js");
const childLoc = path.join(dirname, "fixtures/misc/child.js");

describe("babel-node", () => {
  it("ipc works with spawned babel-node process", done => {
    expect.assertions(1);

    const child = spawn(process.execPath, [binLoc, childLoc], {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
    });

    child.on("message", msg => {
      expect(msg).toBe("hello");
      done();
    });
    child.on("error", error => {
      console.error(error);
      done();
    });
    child.on("exit", () => done());
  }, /* timeout */ 20_000);
});

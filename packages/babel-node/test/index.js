import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const binLoc = path.join(dirname, "../bin/babel-node.js");
const childWithIPCLoc = path.join(dirname, "fixtures/misc/child-with-ipc.js");
const childWithoutIPCLoc = path.join(
  dirname,
  "fixtures/misc/child-without-ipc.js",
);

describe("babel-node", () => {
  it("passes through IPC to spawned babel-node process", done => {
    expect.assertions(1);

    const child = spawn(process.execPath, [binLoc, childWithIPCLoc], {
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

  it("does not create IPC channel when spawned without one", done => {
    expect.assertions(1);

    const child = spawn(process.execPath, [binLoc, childWithoutIPCLoc], {
      stdio: "inherit",
    });

    child.on("error", error => {
      console.error(error);
      done();
    });
    child.on("exit", code => {
      expect(code).toBe(0);
      done();
    });
  }, /* timeout */ 20_000);
});

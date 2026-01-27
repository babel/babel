import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildExternalHelpers } from "@babel/core";
import { createTestContext, runCodeInTestContext } from "./worker.cts";
import { writeFileSync } from "node:fs";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const EXEC_TESTS_NODE = process.env.EXEC_TESTS_NODE;
const EXEC_TESTS_NODE_PATH = process.env.EXEC_TESTS_NODE_PATH;

let id = 0;
const tasks = new Map<
  number,
  [(value?: unknown) => void, (reason?: unknown) => void]
>();

export async function runCodeMayInWorker(
  code: string,
  opts: {
    filename: string;
    timeout?: number;
  },
) {
  if (!EXEC_TESTS_NODE) {
    (global as any).BABEL_HELPERS ??= buildExternalHelpers();
    const ctx = createTestContext();
    return runCodeInTestContext(code, opts, ctx);
  }

  return new Promise((resolve, reject) => {
    if (!(global as any).worker) {
      const workerFile = path.join(dirname, "worker.cjs");
      // Avoid data race when running tests in parallel
      const helpersFile = path.join(dirname, `babel-helpers-${process.pid}.js`);
      writeFileSync(helpersFile, buildExternalHelpers());
      const worker = ((global as any).worker = EXEC_TESTS_NODE_PATH
        ? spawn(EXEC_TESTS_NODE_PATH, [
            workerFile,
            "$BABEL_WORKER$",
            helpersFile,
          ])
        : spawn("fnm", [
            "exec",
            "--using",
            EXEC_TESTS_NODE,
            "--",
            "node",
            workerFile,
            "$BABEL_WORKER$",
            helpersFile,
          ]));
      worker.unref();
      let stderr = "";
      worker.on("error", err => {
        throw err;
      });
      worker.on("exit", code => {
        throw new Error(`Worker exited with code ${code}, stderr: ${stderr}`);
      });
      worker.stderr.on("data", data => {
        stderr += data;
      });
      worker.stdout.on("data", data => {
        data = data + "";
        try {
          const { id, error } = JSON.parse(data);
          if (error) {
            const e = new Error(error.msg);
            e.stack = error.stack;
            tasks.get(id)[1](e);
          } else {
            tasks.get(id)[0]();
          }
        } catch {
          throw new Error("Failed to parse worker response: " + data);
        }
      });
    }
    id++;
    tasks.set(id, [resolve, reject]);
    (globalThis as any).worker.stdin.write(JSON.stringify({ id, code, opts }));
  });
}

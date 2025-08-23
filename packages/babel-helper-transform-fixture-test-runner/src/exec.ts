import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTestContext, runCodeInTestContext } from "./worker.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const EXEC_TESTS_NODE = process.env.EXEC_TESTS_NODE;

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
    const ctx = createTestContext();
    return runCodeInTestContext(code, opts, ctx);
  }

  return new Promise((resolve, reject) => {
    if (!(globalThis as any).worker) {
      const workerFile = path.join(dirname, "worker.js");
      const worker = ((globalThis as any).worker = spawn("fnm", [
        "exec",
        "--using",
        EXEC_TESTS_NODE,
        "--",
        "node",
        workerFile,
        "$BABEL_WORKER$",
      ]));
      worker.unref();
      worker.on("error", err => {
        throw err;
      });
      worker.on("exit", code => {
        throw new Error(`Worker exited with code ${code}`);
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

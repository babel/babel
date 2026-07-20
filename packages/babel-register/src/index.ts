import type { IClient, Options } from "./types.ts";

import * as hook from "./hook.ts";
import { WorkerClient } from "./worker-client.ts";
import { isInRegisterWorker } from "./is-in-register-worker.ts";

let client: IClient;
let isListening = false;

function listener(signal: string | number) {
  client.save();

  if (typeof signal !== "string") return;

  if (process.listenerCount(signal) === 1) {
    process.off("SIGINT", listener);
    process.off("SIGTERM", listener);
    process.kill(process.pid, signal);
  }
}

function register(opts?: Options) {
  if (!isListening) {
    isListening = true;
    process.on("SIGINT", listener);
    process.on("SIGTERM", listener);
    process.once("exit", listener);
  }
  client ||= new WorkerClient();
  hook.register(client, opts);
}

export function revert() {
  hook.revert();
  if (isListening) {
    isListening = false;
    process.off("exit", listener);
    process.off("SIGINT", listener);
    process.off("SIGTERM", listener);
  }
}

export default register;

if (!isInRegisterWorker) {
  register();
}

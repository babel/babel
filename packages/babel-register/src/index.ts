import type { IClient, Options } from "./types.ts";

import * as hook from "./hook.ts";
import { WorkerClient } from "./worker-client.ts";
import { isInRegisterWorker } from "./is-in-register-worker.ts";

let client: IClient;
let listener: undefined | ((signalOrCode: string | number) => void);
function register(opts?: Options) {
  if (!client) {
    let hasClosed = false;
    listener = function (signalOrCode) {
      if (hasClosed) return;
      hasClosed = true;
      client.close();
      if (typeof signalOrCode !== "number") {
        // eslint-disable-next-line n/no-process-exit
        process.exit(0);
      }
    };
    process.on("exit", listener);
    process.on("SIGINT", listener);
    process.on("SIGTERM", listener);
  }
  client ||= new WorkerClient();
  hook.register(client, opts);
}

export function revert() {
  hook.revert();
  if (listener) {
    process.off("exit", listener);
    process.off("SIGINT", listener);
    process.off("SIGTERM", listener);
    listener = undefined;
  }
}

export default register;

if (!isInRegisterWorker) {
  register();
}

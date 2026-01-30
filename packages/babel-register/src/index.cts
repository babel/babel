import type { IClient, Options } from "./types.cts";

import hook = require("./hook.cjs");
import workerClient = require("./worker-client.cjs");

let client: IClient;
function register(opts?: Options) {
  if (!client) {
    let hasClosed = false;
    function listener(signalOrCode: string | number) {
      if (hasClosed) return;
      hasClosed = true;
      client.close();
      if (typeof signalOrCode !== "number") {
        // eslint-disable-next-line n/no-process-exit
        process.exit(0);
      }
    }
    process.on("exit", listener);
    process.on("SIGINT", listener);
    process.on("SIGTERM", listener);
  }
  client ||= new workerClient.WorkerClient();
  hook.register(client, opts);
}

export = Object.assign(register, {
  revert: hook.revert,
  default: register,
  __esModule: true,
});

if (!require("./is-in-register-worker.cjs").isInRegisterWorker) {
  register();
}

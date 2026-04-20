import type { IClient, Options } from "./types.cts";

import hook = require("./hook.cjs");
import workerClient = require("./worker-client.cjs");

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
  client ||= new workerClient.WorkerClient();
  hook.register(client, opts);
}

function revert() {
  hook.revert();
  if (listener) {
    process.off("exit", listener);
    process.off("SIGINT", listener);
    process.off("SIGTERM", listener);
    listener = undefined;
  }
}

export = Object.assign(register, {
  revert,
  default: register,
  __esModule: true,
});

if (!require("./is-in-register-worker.cjs").isInRegisterWorker) {
  register();
}

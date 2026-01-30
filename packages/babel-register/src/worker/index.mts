import type { ACTIONS } from "../types.cts";

import handleMessage from "./handle-message.mts";

import { parentPort, type MessagePort } from "node:worker_threads";

parentPort.addListener(
  "message",

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async ({
    signal,
    port,
    action,
    payload,
  }: {
    signal: Int32Array;
    port: MessagePort;
    action: ACTIONS;
    payload: any;
  }) => {
    let response;

    try {
      response = { result: await handleMessage(action, payload) };
    } catch (error) {
      response = { error, errorData: { ...error } };
    }

    try {
      port.postMessage(response);
    } catch {
      port.postMessage({
        error: new Error("Cannot serialize worker response"),
      });
    } finally {
      port.close();
      Atomics.store(signal, 0, 1);
      Atomics.notify(signal, 0);
    }
  },
);

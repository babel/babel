/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { ACTIONS } from "../types.cts";

const babel = require("./babel-core.cjs");
import transform = require("./transform.cjs");

export = function handleMessage(action: ACTIONS, payload: any) {
  switch (action) {
    case "GET_DEFAULT_EXTENSIONS":
      return babel.DEFAULT_EXTENSIONS;
    case "SET_OPTIONS":
      return transform.setOptions(payload);
    case "TRANSFORM":
      return transform.transform(payload.code, payload.filename);
    case "CLOSE":
      return babel.cache.disable();
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
};

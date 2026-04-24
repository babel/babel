import { ACTIONS } from "../types.ts";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import {
  setOptions,
  transform,
  disableCache,
  isFileIgnored,
} from "./transform.ts";

export default function handleMessage(action: ACTIONS, payload: any) {
  switch (action) {
    case ACTIONS.GET_DEFAULT_EXTENSIONS:
      return DEFAULT_EXTENSIONS;
    case ACTIONS.SET_OPTIONS:
      return setOptions(payload);
    case ACTIONS.TRANSFORM:
      return transform(payload.code, payload.filename);
    case ACTIONS.IS_FILE_IGNORED:
      return isFileIgnored(payload);
    case ACTIONS.CLOSE:
      return disableCache();
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
}

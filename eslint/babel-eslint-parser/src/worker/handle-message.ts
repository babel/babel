import { types, version } from "@babel/core";
import maybeParse from "./maybeParse.ts";
import { getTokLabels, getVisitorKeys } from "../ast-info.ts";
import { normalizeBabelParseConfig } from "./configuration.ts";
import { ACTIONS } from "../client.ts";

export default function handleMessage(action: ACTIONS, payload: any) {
  switch (action) {
    case ACTIONS.GET_VERSION:
      return version;
    case ACTIONS.GET_TYPES_INFO:
      return {
        FLOW_FLIPPED_ALIAS_KEYS: types.FLIPPED_ALIAS_KEYS.Flow,
        VISITOR_KEYS: types.VISITOR_KEYS,
      };
    case ACTIONS.GET_TOKEN_LABELS:
      return getTokLabels();
    case ACTIONS.GET_VISITOR_KEYS:
      return getVisitorKeys();
    case ACTIONS.MAYBE_PARSE:
      return normalizeBabelParseConfig(payload.options).then(options =>
        maybeParse(payload.code, options),
      );
    case ACTIONS.MAYBE_PARSE_SYNC:
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
}

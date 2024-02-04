import babel = require("./babel-core.cts");
import maybeParse = require("./maybeParse.cts");
import { getVisitorKeys, getTokLabels } from "./ast-info.cts";
import {
  normalizeBabelParseConfig,
  normalizeBabelParseConfigSync,
} from "./configuration.cts";

import { ACTIONS } from "../client.cts";

export = function handleMessage(action: ACTIONS, payload: any) {
  switch (action) {
    case ACTIONS.GET_VERSION:
      return babel.version;
    case ACTIONS.GET_TYPES_INFO:
      return {
        FLOW_FLIPPED_ALIAS_KEYS: babel.types.FLIPPED_ALIAS_KEYS.Flow,
        VISITOR_KEYS: babel.types.VISITOR_KEYS,
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
      if (!USE_ESM) {
        return maybeParse(
          payload.code,
          normalizeBabelParseConfigSync(payload.options),
        );
      }
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
};

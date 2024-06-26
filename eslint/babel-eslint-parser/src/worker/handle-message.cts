import babel = require("./babel-core.cts");
import maybeParse = require("./maybeParse.cts");
import astInfo = require("./ast-info.cts");
import config = require("./configuration.cts");

import Clients = require("../client.cts");
import ACTIONS = Clients.ACTIONS;

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
      return astInfo.getTokLabels();
    case ACTIONS.GET_VISITOR_KEYS:
      return astInfo.getVisitorKeys();
    case ACTIONS.MAYBE_PARSE:
      return config
        .normalizeBabelParseConfig(payload.options)
        .then(options => maybeParse(payload.code, options));
    case ACTIONS.MAYBE_PARSE_SYNC:
      if (!USE_ESM) {
        return maybeParse(
          payload.code,
          config.normalizeBabelParseConfigSync(payload.options),
        );
      }
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
};

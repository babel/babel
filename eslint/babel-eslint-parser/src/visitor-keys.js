import { types as t } from "@babel/core";
import { KEYS as ESLINT_VISITOR_KEYS } from "eslint-visitor-keys";

const { VISITOR_KEYS: BABEL_VISITOR_KEYS } = t;

export default Object.assign(
  {
    Literal: ESLINT_VISITOR_KEYS.Literal,
    MethodDefinition: ["decorators"].concat(
      ESLINT_VISITOR_KEYS.MethodDefinition,
    ),
    Property: ["decorators"].concat(ESLINT_VISITOR_KEYS.Property),
  },
  BABEL_VISITOR_KEYS,
);

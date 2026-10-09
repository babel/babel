import maybeParse from "./maybeParse.ts";
import { normalizeBabelParseConfig } from "./configuration.ts";
import { ACTIONS } from "../client.ts";

export default async function handleMessage(action: ACTIONS, payload: any) {
  switch (action) {
    case ACTIONS.MAYBE_PARSE:
      return await maybeParse(
        payload.code,
        await normalizeBabelParseConfig(payload.options),
      );
  }
}

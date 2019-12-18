import { isAsync, waitFor } from "../../gensync-utils/async";
import type { Handler } from "gensync";

let import_;
try {
  // Node < 13.3 doesn't support import() syntax.
  import_ = require("./import").default;
} catch {}

export default function* loadCjsOrMjsDefault(
  filepath: string,
  asyncError: string,
): Handler<mixed> {
  switch (guessJSModuleType(filepath)) {
    case "cjs":
      return loadCjsDefault(filepath);
    case "unknown":
      try {
        return loadCjsDefault(filepath);
      } catch (e) {
        if (e.code !== "ERR_REQUIRE_ESM") throw e;
      }
    case "mjs":
      if (yield* isAsync()) {
        return yield* waitFor(loadMjsDefault(filepath));
      }
      throw new Error(asyncError);
  }
}

function guessJSModuleType(path: string): "cjs" | "mjs" | "unknown" {
  switch (path.slice(-4)) {
    case ".cjs":
      return "cjs";
    case ".mjs":
      return "mjs";
    default:
      return "unknown";
  }
}

function loadCjsDefault(filepath: string) {
  const module = (require(filepath): mixed);
  return module?.__esModule ? module.default || undefined : module;
}

async function loadMjsDefault(filepath: string) {
  if (!import_) {
    throw new Error(
      "Internal error: Native ECMAScript modules aren't supported" +
        " by this platform.\n",
    );
  }

  const module = await import_(filepath);
  return module.default;
}

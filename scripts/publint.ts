import { globSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { publint } from "publint";
import { formatMessage } from "publint/utils";

const paths = globSync("{packages,eslint,codemods}/*/package.json");

for (const path of paths) {
  const data = JSON.parse(readFileSync(path, "utf-8"));
  if (data.private) continue;
  const result = await publint({
    pkgDir: dirname(path),
    pack: "yarn",
  });
  for (const message of result.messages) {
    if (message.type === "error") {
      process.exitCode = 1;
    }
    console.log(
      dirname(path),
      message.type,
      formatMessage(message, result.pkg)
    );
  }
}

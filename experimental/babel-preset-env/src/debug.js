import semver from "semver";
import { prettifyVersion, semverify } from "./utils";

export const logMessage = (message, context) => {
  const pre = context ? `[${context}] ` : "";
  const logStr = `  ${pre}${message}`;
  console.log(logStr);
};

export const logPlugin = (plugin, targets, list, context) => {
  const envList = list[plugin] || {};
  const filteredList = Object.keys(targets).reduce(
    (a, b) => {
      if (!envList[b] || semver.lt(targets[b], semverify(envList[b]))) {
        a[b] = prettifyVersion(targets[b]);
      }
      return a;
    },
    {},
  );

  logMessage(`${plugin} ${JSON.stringify(filteredList)}`, context);
};

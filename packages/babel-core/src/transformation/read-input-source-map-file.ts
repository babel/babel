import fs from "node:fs";
import path from "node:path";
import { findUpSync } from "find-up-simple";
import { createDebug } from "obug";
import convertSourceMap from "convert-source-map";

const debug = createDebug("babel:transform:file");

function getInputMapPath(
  filename: string,
  root: string,
  inputMapURL: string,
): string | null {
  const inputMapPath = path.resolve(path.dirname(filename), inputMapURL);
  if (inputMapURL.includes("..")) {
    const inputPackageJSONPath = findUpSync("package.json", {
      cwd: path.dirname(filename),
      stopAt: root,
    });
    const inputFileRoot = inputPackageJSONPath
      ? path.dirname(inputPackageJSONPath)
      : root;
    const relativeInputMapPath = path.relative(inputFileRoot, inputMapPath);
    if (relativeInputMapPath.startsWith("..")) {
      debug(
        `discarding input sourcemap "${inputMapPath}" outside of package root "${inputFileRoot}"`,
      );
      return null;
    }
  }
  return inputMapPath;
}

export default function readInputSourceMapFile(
  filename: string,
  root: string,
  inputMapURL: string,
) {
  const inputMapPath = getInputMapPath(filename, root, inputMapURL);
  if (inputMapPath) {
    const inputMapContent = fs.readFileSync(inputMapPath, "utf8");
    return convertSourceMap.fromJSON(inputMapContent);
  }
  return null;
}

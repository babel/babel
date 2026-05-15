import fs from "node:fs";
import path from "node:path";
import { findUpSync } from "find-up-simple";
import buildDebug from "debug";
import convertSourceMap from "convert-source-map";
import type { SourceMapConverter } from "convert-source-map";

const debug = buildDebug("babel:transform:file");

function getInputMapPath(
  filename: string,
  root: string,
  inputMapURL: string,
): string | null {
  const inputFileDir = path.dirname(filename);
  const inputMapPath = path.resolve(inputFileDir, inputMapURL);
  const relativeToInputFileDir = path.relative(inputFileDir, inputMapPath);

  if (
    relativeToInputFileDir.startsWith("..") ||
    path.isAbsolute(relativeToInputFileDir)
  ) {
    const inputPackageJSONPath = findUpSync("package.json", {
      cwd: inputFileDir,
      stopAt: root,
    });
    const inputFileRoot = inputPackageJSONPath
      ? path.dirname(inputPackageJSONPath)
      : root;
    const relativeInputMapPath = path.relative(inputFileRoot, inputMapPath);
    if (
      relativeInputMapPath.startsWith("..") ||
      path.isAbsolute(relativeInputMapPath)
    ) {
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
): SourceMapConverter | null {
  const inputMapPath = getInputMapPath(filename, root, inputMapURL);
  if (inputMapPath) {
    const inputMapContent = fs.readFileSync(inputMapPath, "utf8");
    return convertSourceMap.fromJSON(inputMapContent);
  }
  return null;
}

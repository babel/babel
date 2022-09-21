import convertSourceMap from "convert-source-map";
import { AnyMap, encodedMap } from "@jridgewell/trace-mapping";
import slash from "slash";
import path from "path";
import fs from "fs";

import * as util from "./util";
import type { CmdOptions } from "./options";
import * as watcher from "./watcher";

import type {
  SectionedSourceMap,
  SourceMapInput,
  TraceMap,
} from "@jridgewell/trace-mapping";
import type { FileResult } from "@babel/core";

type CompilationOutput = {
  code: string;
  map: SourceMapInput;
  hasRawMap: boolean;
};

export default async function ({
  cliOptions,
  babelOptions,
}: CmdOptions): Promise<void> {
  function buildResult(fileResults: Array<FileResult>): CompilationOutput {
    const mapSections: SectionedSourceMap["sections"] = [];

    let code = "";
    let offset = 0;

    let hasRawMap = false;

    for (const result of fileResults) {
      if (!result) continue;

      hasRawMap = !!result.map;

      mapSections.push({
        offset: { line: offset, column: 0 },
        map: result.map || {
          version: 3,
          names: [],
          sources: [],
          mappings: [],
        },
      });

      code += result.code + "\n";
      offset += countNewlines(result.code) + 1;
    }

    const map = new AnyMap({
      version: 3,
      file:
        cliOptions.sourceMapTarget ||
        path.basename(cliOptions.outFile || "") ||
        "stdout",
      sections: mapSections,
    });
    // For some reason, the spec doesn't allow sourceRoot when constructing a
    // sectioned sourcemap. But AllMap returns a regular sourcemap, we can
    // freely add to with a sourceRoot.
    map.sourceRoot = babelOptions.sourceRoot;

    // add the inline sourcemap comment if we've either explicitly asked for inline source
    // maps, or we've requested them without any output file
    if (
      babelOptions.sourceMaps === "inline" ||
      (!cliOptions.outFile && babelOptions.sourceMaps)
    ) {
      code += "\n" + convertSourceMap.fromObject(encodedMap(map)).toComment();
    }

    return {
      map: map,
      code: code,
      hasRawMap: hasRawMap,
    };
  }

  function countNewlines(code: string): number {
    let count = 0;
    let index = -1;
    while ((index = code.indexOf("\n", index + 1)) !== -1) {
      count++;
    }
    return count;
  }

  function output(fileResults: Array<FileResult>): void {
    const result = buildResult(fileResults);

    if (cliOptions.outFile) {
      fs.mkdirSync(path.dirname(cliOptions.outFile), { recursive: true });

      let outputMap: "both" | "external" | false = false;
      if (babelOptions.sourceMaps && babelOptions.sourceMaps !== "inline") {
        outputMap = "external";
      } else if (babelOptions.sourceMaps == undefined && result.hasRawMap) {
        outputMap = util.hasDataSourcemap(result.code) ? "external" : "both";
      }

      if (outputMap) {
        const mapLoc = cliOptions.outFile + ".map";
        if (outputMap === "external") {
          result.code = util.addSourceMappingUrl(result.code, mapLoc);
        }
        fs.writeFileSync(
          mapLoc,
          JSON.stringify(encodedMap(result.map as TraceMap)),
        );
      }

      fs.writeFileSync(cliOptions.outFile, result.code);
    } else {
      process.stdout.write(result.code + "\n");
    }
  }

  function readStdin(): Promise<string> {
    return new Promise((resolve, reject): void => {
      let code = "";

      process.stdin.setEncoding("utf8");

      process.stdin.on("readable", function () {
        const chunk = process.stdin.read();
        if (chunk !== null) code += chunk;
      });

      process.stdin.on("end", function () {
        resolve(code);
      });
      process.stdin.on("error", reject);
    });
  }

  async function stdin(): Promise<void> {
    const code = await readStdin();

    const res = await util.transformRepl(cliOptions.filename, code, {
      ...babelOptions,
      sourceFileName: "stdin",
    });

    output([res]);
  }

  async function walk(filenames: Array<string>): Promise<void> {
    const _filenames: string[] = [];

    filenames.forEach(function (filename) {
      if (!fs.existsSync(filename)) return;

      const stat = fs.statSync(filename);
      if (stat.isDirectory()) {
        const dirname = filename;

        util
          .readdirForCompilable(
            filename,
            cliOptions.includeDotfiles,
            cliOptions.extensions,
          )
          .forEach(function (filename) {
            _filenames.push(path.join(dirname, filename));
          });
      } else {
        _filenames.push(filename);
      }
    });

    const results = await Promise.all(
      _filenames.map(async function (filename: string): Promise<any> {
        let sourceFilename = filename;
        if (cliOptions.outFile) {
          sourceFilename = path.relative(
            path.dirname(cliOptions.outFile),
            sourceFilename,
          );
        }
        sourceFilename = slash(sourceFilename);

        try {
          return await util.compile(filename, {
            ...babelOptions,
            sourceFileName: sourceFilename,
            // Since we're compiling everything to be merged together,
            // "inline" applies to the final output file, but not to the individual
            // files being concatenated.
            sourceMaps:
              babelOptions.sourceMaps === "inline"
                ? true
                : babelOptions.sourceMaps,
          });
        } catch (err) {
          if (!cliOptions.watch) {
            throw err;
          }

          console.error(err);
          return null;
        }
      }),
    );

    output(results);
  }

  async function files(filenames: Array<string>): Promise<void> {
    if (cliOptions.watch) {
      watcher.enable({ enableGlobbing: false });
    }

    if (!cliOptions.skipInitialBuild) {
      await walk(filenames);
    }

    if (cliOptions.watch) {
      filenames.forEach(watcher.watch);

      watcher.startWatcher();

      watcher.onFilesChange((changes, event, cause) => {
        const actionableChange = changes.some(
          filename =>
            util.isCompilableExtension(filename, cliOptions.extensions) ||
            filenames.includes(filename),
        );
        if (!actionableChange) return;

        if (cliOptions.verbose) {
          console.log(`${event} ${cause}`);
        }

        walk(filenames).catch(err => {
          console.error(err);
        });
      });
    }
  }

  if (cliOptions.filenames.length) {
    await files(cliOptions.filenames);
  } else {
    await stdin();
  }
}

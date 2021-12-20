import slash from "slash";
import path from "path";
import fs from "fs";

import * as util from "./util";
import * as watcher from "./watcher";
import type { CmdOptions } from "./options";

const FILE_TYPE = Object.freeze({
  NON_COMPILABLE: "NON_COMPILABLE",
  COMPILED: "COMPILED",
  IGNORED: "IGNORED",
  ERR_COMPILATION: "ERR_COMPILATION",
} as const);

function outputFileSync(filePath: string, data: string | Buffer): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
}

export default async function ({
  cliOptions,
  babelOptions,
}: CmdOptions): Promise<void> {
  async function write(
    src: string,
    base: string,
  ): Promise<keyof typeof FILE_TYPE> {
    let relative = path.relative(base, src);

    if (!util.isCompilableExtension(relative, cliOptions.extensions)) {
      return FILE_TYPE.NON_COMPILABLE;
    }

    relative = util.withExtension(
      relative,
      cliOptions.keepFileExtension
        ? path.extname(relative)
        : cliOptions.outFileExtension,
    );

    const dest = getDest(relative, base);

    try {
      const res = await util.compile(src, {
        ...babelOptions,
        sourceFileName: slash(path.relative(dest + "/..", src)),
      });

      if (!res) return FILE_TYPE.IGNORED;

      // we've requested explicit sourcemaps to be written to disk
      if (
        res.map &&
        babelOptions.sourceMaps &&
        babelOptions.sourceMaps !== "inline"
      ) {
        const mapLoc = dest + ".map";
        res.code = util.addSourceMappingUrl(res.code, mapLoc);
        res.map.file = path.basename(relative);
        outputFileSync(mapLoc, JSON.stringify(res.map));
      }

      outputFileSync(dest, res.code);
      util.chmod(src, dest);

      if (cliOptions.verbose) {
        console.log(path.relative(process.cwd(), src) + " -> " + dest);
      }

      return FILE_TYPE.COMPILED;
    } catch (err) {
      if (cliOptions.watch) {
        console.error(err);
        return FILE_TYPE.ERR_COMPILATION;
      }

      throw err;
    }
  }

  function getDest(filename: string, base: string): string {
    if (cliOptions.relative) {
      return path.join(base, cliOptions.outDir, filename);
    }
    return path.join(cliOptions.outDir, filename);
  }

  async function handleFile(src: string, base: string): Promise<boolean> {
    const written = await write(src, base);

    if (
      (cliOptions.copyFiles && written === FILE_TYPE.NON_COMPILABLE) ||
      (cliOptions.copyIgnored && written === FILE_TYPE.IGNORED)
    ) {
      const filename = path.relative(base, src);
      const dest = getDest(filename, base);
      outputFileSync(dest, fs.readFileSync(src));
      util.chmod(src, dest);
    }
    return written === FILE_TYPE.COMPILED;
  }

  async function handle(filenameOrDir: string): Promise<number> {
    if (!fs.existsSync(filenameOrDir)) return 0;

    const stat = fs.statSync(filenameOrDir);

    if (stat.isDirectory()) {
      const dirname = filenameOrDir;

      let count = 0;

      const files = util.readdir(dirname, cliOptions.includeDotfiles);
      for (const filename of files) {
        const src = path.join(dirname, filename);

        const written = await handleFile(src, dirname);
        if (written) count += 1;
      }

      return count;
    } else {
      const filename = filenameOrDir;
      const written = await handleFile(filename, path.dirname(filename));

      return written ? 1 : 0;
    }
  }

  let compiledFiles = 0;
  let startTime = null;

  const logSuccess = util.debounce(function () {
    if (startTime === null) {
      // This should never happen, but just in case it's better
      // to ignore the log message rather than making @babel/cli crash.
      return;
    }

    const diff = process.hrtime(startTime);

    console.log(
      `Successfully compiled ${compiledFiles} ${
        compiledFiles !== 1 ? "files" : "file"
      } with Babel (${diff[0] * 1e3 + Math.round(diff[1] / 1e6)}ms).`,
    );
    compiledFiles = 0;
    startTime = null;
  }, 100);

  if (cliOptions.watch) watcher.enable({ enableGlobbing: true });

  if (!cliOptions.skipInitialBuild) {
    if (cliOptions.deleteDirOnStart) {
      util.deleteDir(cliOptions.outDir);
    }

    fs.mkdirSync(cliOptions.outDir, { recursive: true });

    startTime = process.hrtime();

    for (const filename of cliOptions.filenames) {
      // compiledFiles is just incremented without reading its value, so we
      // don't risk race conditions.
      // eslint-disable-next-line require-atomic-updates
      compiledFiles += await handle(filename);
    }

    if (!cliOptions.quiet) {
      logSuccess();
      logSuccess.flush();
    }
  }

  if (cliOptions.watch) {
    // This, alongside with debounce, allows us to only log
    // when we are sure that all the files have been compiled.
    let processing = 0;

    cliOptions.filenames.forEach(filenameOrDir => {
      watcher.watch(filenameOrDir);

      watcher.onFilesChange(async filenames => {
        processing++;
        if (startTime === null) startTime = process.hrtime();

        try {
          const written = await Promise.all(
            filenames.map(filename =>
              handleFile(
                filename,
                filename === filenameOrDir
                  ? path.dirname(filenameOrDir)
                  : filenameOrDir,
              ),
            ),
          );

          compiledFiles += written.filter(Boolean).length;
        } catch (err) {
          console.error(err);
        }

        processing--;
        if (processing === 0 && !cliOptions.quiet) logSuccess();
      });
    });
  }
}

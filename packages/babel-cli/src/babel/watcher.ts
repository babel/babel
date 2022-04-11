import { createRequire } from "module";
import path from "path";

const fileToDeps = new Map<string, Set<string>>();
const depToFiles = new Map<string, Set<string>>();

let isWatchMode = false;
let watcher;

export function enable({ enableGlobbing }: { enableGlobbing: boolean }) {
  isWatchMode = true;

  const { FSWatcher } = requireChokidar();

  watcher = new FSWatcher({
    disableGlobbing: !enableGlobbing,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 10,
    },
  });

  watcher.on("unlink", unwatchFile);
}

export function watch(filename: string): void {
  if (!isWatchMode) {
    throw new Error(
      "Internal Babel error: .watch called when not in watch mode.",
    );
  }

  watcher.add(path.resolve(filename));
}

/**
 * Call @param callback whenever a dependency (source file)/
 * external dependency (non-source file) changes.
 *
 * Handles mapping external dependencies to their corresponding
 * dependencies.
 */
export function onFilesChange(
  callback: (filenames: string[], event: string, cause: string) => void,
): void {
  if (!isWatchMode) {
    throw new Error(
      "Internal Babel error: .onFilesChange called when not in watch mode.",
    );
  }

  watcher.on("all", (event, filename) => {
    if (event !== "change" && event !== "add") return;

    const absoluteFile = path.resolve(filename);
    callback(
      [absoluteFile, ...(depToFiles.get(absoluteFile) ?? [])],
      event,
      absoluteFile,
    );
  });
}

export function updateExternalDependencies(
  filename: string,
  dependencies: Set<string>,
) {
  if (!isWatchMode) return;

  // Use absolute paths
  const absFilename = path.resolve(filename);
  const absDependencies = new Set(
    Array.from(dependencies, dep => path.resolve(dep)),
  );

  if (fileToDeps.has(absFilename)) {
    for (const dep of fileToDeps.get(absFilename)) {
      if (!absDependencies.has(dep)) {
        removeFileDependency(absFilename, dep);
      }
    }
  }
  for (const dep of absDependencies) {
    if (!depToFiles.has(dep)) {
      depToFiles.set(dep, new Set());

      watcher.add(dep);
    }
    depToFiles.get(dep).add(absFilename);
  }

  fileToDeps.set(absFilename, absDependencies);
}

function removeFileDependency(filename: string, dep: string) {
  depToFiles.get(dep).delete(filename);

  if (depToFiles.get(dep).size === 0) {
    depToFiles.delete(dep);

    watcher.unwatch(dep);
  }
}

function unwatchFile(filename: string) {
  if (!fileToDeps.has(filename)) return;

  for (const dep of fileToDeps.get(filename)) {
    removeFileDependency(filename, dep);
  }
  fileToDeps.delete(filename);
}

function requireChokidar(): any {
  // @ts-expect-error - TS is not configured to support import.meta.
  const require = createRequire(import.meta.url);

  try {
    return process.env.BABEL_8_BREAKING
      ? require("chokidar")
      : parseInt(process.versions.node) >= 8
      ? require("chokidar")
      : require("@nicolo-ribaudo/chokidar-2");
  } catch (err) {
    console.error(
      "The optional dependency chokidar failed to install and is required for " +
        "--watch. Chokidar is likely not supported on your platform.",
    );
    throw err;
  }
}

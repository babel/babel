// Yarn's pnpm linker hardlinks every file of every package from Yarn's global
// index (<globalFolder>/index/<xx>/<sha1>[<mode>].dat), and fails the install
// when a hardlink can't be created:
// - NTFS allows at most 1023 hardlinks per file, and @unicode/unicode-16.0.0
//   and 18.0.0 contain ~2000 identical files, so `yarn install` fails on
//   Windows with "UNKNOWN: unknown error, link" (libuv doesn't map
//   ERROR_TOO_MANY_LINKS);
// - hardlinks can't cross devices (EXDEV).
// This plugin copies the index file instead, with the mode and times the linker
// gives index files. Remove it once Yarn falls back to copying by itself.

"use strict";

const INDEX_FILE_RE = /\/index\/[0-9a-f]{2}\/[0-9a-f]{40}([0-7]*)\.dat$/;

function isUnlinkableError(error) {
  return (
    error.code === "EMLINK" ||
    error.code === "EXDEV" ||
    (process.platform === "win32" && error.code === "UNKNOWN")
  );
}

module.exports = {
  name: "plugin-index-hardlink-fallback",
  factory(require) {
    const { constants, xfs } = require("@yarnpkg/fslib");

    const defaultTime = new Date(constants.SAFE_TIME * 1000);
    const linkPromise = xfs.linkPromise;

    xfs.linkPromise = async function (existingP, newP) {
      try {
        return await linkPromise.call(this, existingP, newP);
      } catch (error) {
        const match = INDEX_FILE_RE.exec(existingP);
        if (!match || !isUnlinkableError(error)) throw error;

        await this.copyFilePromise(existingP, newP);
        // The linker only chmods the index file after linking it
        await this.chmodPromise(newP, match[1] ? parseInt(match[1], 8) : 0o644);
        await this.lutimesPromise(newP, defaultTime, defaultTime);
      }
    };

    return {};
  },
};

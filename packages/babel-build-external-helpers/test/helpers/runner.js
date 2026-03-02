import {
  buildProcessTests,
  buildParallelProcessTests,
} from "@babel/helper-transform-fixture-test-runner";
import path from "node:path";
import { commonJS } from "$repo-utils";

const { __dirname } = commonJS(import.meta.url);

const fixtureLoc = path.join(__dirname, "../fixtures");
const rootDir = path.resolve(__dirname, "../../../..");

function escapeRegExp(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

const normalizeOutput = function (str, cwd) {
  let result = str
    .replace(/\(\d+ms\)/g, "(123ms)")
    .replace(new RegExp(escapeRegExp(cwd), "g"), "<CWD>")
    // (non-win32) /foo/babel/packages -> <CWD>/packages
    // (win32) C:\foo\babel\packages -> <CWD>\packages
    .replace(new RegExp(escapeRegExp(rootDir), "g"), "<ROOTDIR>");
  if (process.platform === "win32") {
    result = result
      // C:\\foo\\babel\\packages -> <CWD>\\packages (in js string literal)
      .replace(
        new RegExp(escapeRegExp(rootDir.replace(/\\/g, "\\\\")), "g"),
        "<ROOTDIR>",
      );
  }
  return result;
};

export const runParallel = buildParallelProcessTests(
  "babel-build-external-helpers",
  buildProcessTests(
    fixtureLoc,
    function (test) {
      test.binLoc = path.join(__dirname, "../../lib", test.suiteName);
    },
    function (test, tmpDir, stdout, stderr) {
      return {
        stdout: normalizeOutput(stdout, tmpDir),
        stderr: normalizeOutput(stderr, tmpDir),
      };
    },
  ),
);

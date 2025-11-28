import testRunner from "@babel/helper-transform-fixture-test-runner";
import path from "node:path";
import { URL } from "node:url";

export default function (loc: string) {
  let fixtures = new URL("./fixtures", loc).pathname;
  if (process.platform === "win32") {
    // Remove the leading / before the drive letter
    // TODO: After dropping Node.js 10 support, use fileURLToPath
    fixtures = fixtures.slice(1);
  }

  const name = path.basename(new URL("..", loc).pathname);

  testRunner(fixtures, name);
}

import testRunner from "@babel/helper-transform-fixture-test-runner";
import path from "path";
import { URL } from "url";

export default function (loc) {
  if (!process.env.BABEL_8_BREAKING) {
    if (!loc.startsWith("file://")) {
      const name = path.basename(path.dirname(loc));
      testRunner(loc + "/fixtures", name);
      return;
    }
  }

  const fixtures = new URL("./fixtures", loc).pathname;
  const name = path.basename(new URL("..", loc).pathname);

  testRunner(fixtures, name);
}

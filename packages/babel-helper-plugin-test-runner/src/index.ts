import testRunner from "@babel/helper-transform-fixture-test-runner";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default function (loc: string) {
  const fixtures = new URL("./fixtures", loc);
  const name = path.basename(fileURLToPath(new URL("..", loc)));

  testRunner(fixtures, name);
}

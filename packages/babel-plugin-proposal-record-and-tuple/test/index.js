import runner from "@babel/helper-plugin-test-runner";
import { describeBabel8 } from "$repo-utils";

describeBabel8("This plugin is not supported in Babel 8", () => {
  it("dummy", () => {});
});
runner(import.meta.url);

import { styleText } from "node:util";

export default async function testRunner({ title, testcases }) {
  console.log(title);
  const indent = "  ";
  for (const [subtitle, testcase] of testcases) {
    try {
      await testcase();
      console.log(styleText("green", indent + "✓ " + subtitle));
    } catch (e) {
      console.log(styleText("red", indent + "✗ " + subtitle));
      console.error(e);
      process.exitCode = 1;
    }
  }
}

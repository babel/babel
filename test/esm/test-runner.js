import { green, red } from "nanocolors";

export default async function testRunner({ title, testcases }) {
  console.log(title);
  const indent = "  ";
  for (const [subtitle, testcase] of testcases) {
    try {
      await testcase();
      console.log(green(indent + "✓ " + subtitle));
    } catch (e) {
      console.log(red(indent + "✗ " + subtitle));
      console.error(e);
    }
  }
}

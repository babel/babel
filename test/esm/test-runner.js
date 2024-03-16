import colors from "picocolors";

export default async function testRunner({ title, testcases }) {
  console.log(title);
  const indent = "  ";
  for (const [subtitle, testcase] of testcases) {
    try {
      await testcase();
      console.log(colors.green(indent + "✓ " + subtitle));
    } catch (e) {
      console.log(colors.red(indent + "✗ " + subtitle));
      console.error(e);
      process.exitCode = 1;
    }
  }
}

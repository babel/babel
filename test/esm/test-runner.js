import chalk from "chalk";

export default async function testRunner({ title, testcases }) {
  console.log(title);
  const indent = "  ";
  for (const [subtitle, testcase] of testcases) {
    try {
      await testcase();
      console.log(chalk.green(indent + "✓ " + subtitle));
    } catch (e) {
      console.log(chalk.red(indent + "✗ " + subtitle));
      console.error(e);
      process.exitCode = 1;
    }
  }
}

import { run } from "envinfo";

export default async function() {
  console.log("\nEnvironment Info:");
  return run(
    {
      System: ["OS", "CPU"],
      Binaries: ["Node", "npm", "Yarn"],
      Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
      npmPackages: "/**/{*babel*,@babel/*/}",
      npmGlobalPackages: "*babel*",
    },
    {
      duplicates: true,
      showNotFound: true,
    },
  ).then(console.log);
}

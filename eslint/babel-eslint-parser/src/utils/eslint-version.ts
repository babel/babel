import packageJson from "eslint/package.json" with { type: "json" };

export default parseInt(packageJson.version, 10);

import commander from "commander";
import { util, runtime } from "babel-core";

commander.option("-l, --whitelist [whitelist]", "Whitelist of helpers to ONLY include", util.list);
commander.option("-t, --output-type [type]", "Type of output (global|umd|var)", "global");

commander.usage("[options]");
commander.parse(process.argv);

console.log(runtime(commander.whitelist, commander.outputType));

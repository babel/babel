var commander = require("commander");
var util      = require("babel-core").util;
var runtime   = require("babel-core").buildExternalHelpers;

commander.option("-l, --whitelist [whitelist]", "Whitelist of helpers to ONLY include", util.list);
commander.option("-t, --output-type [type]", "Type of output (global|umd|var)", "global");

commander.usage("[options]");
commander.parse(process.argv);

console.log(runtime(commander.whitelist, commander.outputType));

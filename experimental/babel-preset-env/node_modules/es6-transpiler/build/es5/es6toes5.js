var args = process.argv.filter(function(arg) {
	return !/^-/.test(arg);
});

require('./es6-transpiler').run({
	filename: args[2],
	outputToConsole: !args[3],
	outputFilename: args[3],
	errorsToConsole: true,
	fromConsole: true,
	consoleArgs: process.argv
});

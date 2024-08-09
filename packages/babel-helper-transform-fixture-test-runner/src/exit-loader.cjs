// We need to gracefully exit rather than just terminating spawn tests with SIGINT
// to let c8 correctly report the collected coverage info.
// eslint-disable-next-line n/no-process-exit
process.on("message", () => process.exit(0));
process.channel.unref();
